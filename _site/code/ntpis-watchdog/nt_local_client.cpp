/*
# Copyright (c) 2016 Shanghai Novotech. All rights reserved.
*/

#include "nt_local_client.h"
#include "nt_dog.h"
#include <QDebug>
#include <cstdio>

NtLocalClient::NtLocalClient(QObject *parent) :
    QObject(parent),
    _client_(new QLocalSocket(this))
{     
    connect(_client_, SIGNAL(error(QLocalSocket::LocalSocketError)), this, SLOT(socket_error(QLocalSocket::LocalSocketError)));
    connect(_client_, SIGNAL(connected()), this, SLOT(when_connected()));
    connect(_client_, SIGNAL(readyRead()), this, SLOT(readyRead()));
}

void NtLocalClient::connect_server() {
    _client_->disconnectFromServer();
    _client_->connectToServer("ntpis160.socket");
}

void NtLocalClient::send_msg(const char * message) {
    if (message == NULL)
        return;

    _client_->write(message, strlen(message));
    _client_->flush();
}

bool NtLocalClient::is_connected() const
{
    return _client_->state() == QLocalSocket::ConnectedState;
}

// errors from emun QLocalSocket::LocalSocketError
static const char * errors[] = {"ConnectionRefusedError", "PeerClosedError", "ServerNotFoundError", "SocketAccessError", "SocketResourceError",
                   "SocketTimeoutError", "DatagramTooLargeError", "ConnectionError", "UnsupportedSocketOperationError",
                   "UnknownSocketError", "OperationError"};

void NtLocalClient::socket_error(QLocalSocket::LocalSocketError error)
{
    printf("QLocalSocket got: %s\n", errors[error]);
    // exit(2);
}

void NtLocalClient::when_connected()
{
    send_msg("NTPIS160_WATCH_DOG");
}

void NtLocalClient::readyRead()
{
    QByteArray data = _client_->readAll();
    if (!data.isEmpty())
    {
        NtDog * dog = qobject_cast<NtDog *>(this->parent());
        dog->got_bone();
    }
    printf("%s", data.constData());
    fflush(stdout);
}
