#include "nt_local_server.h"
#include "nt_gps.h"
#include <QLocalServer>
#include <QLocalSocket>
#include <QProcess>

#define FEED_DOG_INTERVAL 5000

NtLocalSocket::NtLocalSocket(QLocalSocket *socket, QObject *parent) :
    QObject(parent),
    _socket(socket),
    timer(new QTimer(this))
{
    start_at =  QDateTime::currentDateTime().toTime_t();
    timer->setInterval(FEED_DOG_INTERVAL);
    connect(timer, SIGNAL(timeout()), this, SLOT(feed_watch_dog()));
}

QLocalSocket * NtLocalSocket::socket() const
{
    return _socket;
}

void NtLocalSocket::start_feed_watch_dog()
{
    QTimer::singleShot(0, this, SLOT(feed_watch_dog()));
    timer->start();
}

void NtLocalSocket::feed_watch_dog()
{
    if (_socket != NULL)
    {
        if (_socket->state() == QLocalSocket::ConnectedState)
        {
            QString response = QString("NtDogBone %1\n").arg(NT_APP->uptime());
            _socket->write(response.toUtf8());
            _socket->flush();
        }
    }
}

quint32 NtLocalSocket::uptime() const
{
    return QDateTime::currentDateTime().toTime_t() - start_at;
}

QString NtLocalSocket::uptime_str() const
{
    quint32 duration = uptime();
    if (duration < 60)
    {
        return QString("%1 seconds").arg(duration);
    }
    else if (duration < 3600)
    {
        quint16 minutes = duration / 60;
        quint16 seconds = duration % 60;
        return QString("%1 min, %2 sec").arg(minutes).arg(seconds);
    }
    else
    {
        quint16 hours = duration / 3600;
        quint16 left_seconds = duration % 3600;
        quint16 minutes = left_seconds / 60;
        quint16 seconds = left_seconds % 60;
        return QString("%1 hours, %2 min, %3 sec").arg(hours).arg(minutes).arg(seconds);
    }
}

NTLocalServer::NTLocalServer(QObject *parent) :
    QObject(parent),
    _localServer(new QLocalServer(this))
{
    connect(_localServer, SIGNAL(newConnection()), this, SLOT(serve_new_connection_handler()));
}

NTLocalServer::~NTLocalServer() {
    if(_localServer)
        _localServer->close();
}

void NTLocalServer::serve_new_connection_handler() {
    printf("New local socket connection comming.\n");
    QLocalSocket* socket = _localServer->nextPendingConnection();
    if (socket != NULL)
    {
        NtLocalSocket * local_socket = new NtLocalSocket(socket);
        _connections.insert(socket, local_socket);
        connect(socket, SIGNAL(readyRead()), this, SLOT(socket_ready_read_handler()));
        connect(socket, SIGNAL(disconnected()), this, SLOT(socket_close_handler()));
    }
}

void NTLocalServer::socket_ready_read_handler()
{
    QLocalSocket* socket = static_cast<QLocalSocket*>(sender());
    if(socket == NULL)
        return;

    NtLocalSocket * local_socket = _connections.value(socket);
    QString response;
    QTextStream stream(socket);
    QString receivedContent = stream.readAll();
    qDebug() << "********************* Local socket:" << receivedContent;
    if(receivedContent == "usb_pluged")
    {
        emit usb_pluged();
    }
    else if(receivedContent == "usb_unpluged")
    {
        emit usb_unpluged();
    }
    else if (receivedContent == "NTPIS160_WATCH_DOG")
    {
        local_socket->start_feed_watch_dog();
    }
    else
    {
        //qDebug() << "Receive:" << receivedContent;

        if(receivedContent.startsWith("fake_gps:"))
        {
            QString receivedContent2 = receivedContent.mid(9);
            QStringList fake_location = receivedContent2.split(",");
            if(fake_location.size() == 3)
            {
                NTGps.set_fake_location(fake_location[0].toDouble(), fake_location[1].toDouble(), fake_location[2].toDouble());
            }
        }
    }
    response = "ok";
    socket->write(response.toUtf8());
    socket->flush();
}

void NTLocalServer::socket_close_handler() {
    QLocalSocket * socket = qobject_cast<QLocalSocket *>(sender());
    NtLocalSocket * local_socket = _connections.value(socket);
    _connections.remove(socket);
    local_socket->deleteLater();
}

void NTLocalServer::start() {
    if(!_localServer)
    {
        abort();
        return;
    }
    bool ok = QLocalServer::removeServer(NTLocalServer_socket);
    if(!ok)
    {
        printf("Unable to remove /tmp/"NTLocalServer_socket"\n");
    }
    ok = _localServer->listen(NTLocalServer_socket);
    if (!ok) {
        printf("Unable to start local server\nExiting ...\n\n");
        exit(1);
    }
    printf("Start local server.\n");
}
