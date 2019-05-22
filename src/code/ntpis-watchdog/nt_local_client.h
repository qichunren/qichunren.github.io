/*
# Copyright (c) 2016 Shanghai Novotech. All rights reserved.
*/

#ifndef PAIGO_LOCAL_CLIENT_H
#define PAIGO_LOCAL_CLIENT_H

#include <QObject>
#include <QLocalSocket>

class NtLocalClient : public QObject
{
    Q_OBJECT

public:
    explicit NtLocalClient(QObject *parent = 0);
    void connect_server();
    void send_msg(const char * message);
    bool is_connected() const;

signals:

public slots:
    void socket_error(QLocalSocket::LocalSocketError error);
    void when_connected();
    void readyRead();

private:
    QLocalSocket * _client_;
};

#endif // PAIGO_LOCAL_CLIENT_H
