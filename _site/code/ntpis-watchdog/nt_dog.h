/*
# Copyright (c) 2016 Shanghai Novotech. All rights reserved.
*/

#ifndef PAIGO_DOG_H
#define PAIGO_DOG_H
#include "nt_local_client.h"

#include <QObject>

class NtDog : public QObject
{
    Q_OBJECT

public:
    explicit NtDog(QObject *parent = 0);
    void got_bone();
    void alive_master();
    void re_connect_local_server();

signals:

public slots:
    void tick();

private:
    NtLocalClient * nt_client;
    quint16 server_inactive_interval;
    quint16 tick_count;
};

#endif // PAIGO_DOG_H
