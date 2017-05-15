#ifndef NT_LOCAL_SERVER_H
#define NT_LOCAL_SERVER_H
#include "nt_application.h"

#include <QObject>
#include <QLocalSocket>

class QLocalServer;

class NtLocalSocket : public QObject
{
    Q_OBJECT

public:
    explicit NtLocalSocket(QLocalSocket * socket, QObject *parent = 0);
    QLocalSocket * socket() const;
    void start_feed_watch_dog();

    quint32 uptime() const;
    QString uptime_str() const;

public slots:
    void feed_watch_dog();

private:
    QLocalSocket * _socket;
    QTimer *timer;
    quint32 start_at;
};

class NTLocalServer : public QObject
{
    Q_OBJECT
public:
    explicit NTLocalServer(QObject *parent = 0);
    ~NTLocalServer();
    void start();    

signals:
    void usb_pluged();
    void usb_unpluged();

public slots:

private slots:
    void serve_new_connection_handler();
    void socket_ready_read_handler();
    void socket_close_handler();

private:
    QLocalServer * _localServer;
    QHash<QLocalSocket *, NtLocalSocket *> _connections;
};

#endif // NT_LOCAL_SERVER_H
