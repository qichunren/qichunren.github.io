/*
# Copyright (c) 2016 Shanghai Novotech. All rights reserved.
*/

#include "nt_dog.h"
#include <QTimer>
#include <QDebug>
#include <QProcess>

#define TIMEOUT 15 // unit: seconds
#define MASTER_PATH "/usr/local/bin/ntpis160-restart.sh"

NtDog::NtDog(QObject *parent) :
    QObject(parent),
    nt_client(new NtLocalClient(this)),
    server_inactive_interval(0),
    tick_count(0)
{
    nt_client->connect_server();
    QTimer * timer = new QTimer(this);
    connect(timer, SIGNAL(timeout()), SLOT(tick()));
    timer->start(1000);
}

void NtDog::tick()
{
    qDebug() << "server_inactive_interval" << server_inactive_interval;
    if (tick_count % 4 == 0)
    {
        re_connect_local_server();
    }

    if (server_inactive_interval > TIMEOUT)
    {
        alive_master();
        server_inactive_interval = 0;
    }

    server_inactive_interval++;
    tick_count++;
}

void NtDog::re_connect_local_server()
{
    if (!nt_client->is_connected())
        nt_client->connect_server();
}

void NtDog::got_bone()
{
    server_inactive_interval = 0;
}

void NtDog::alive_master()
{
    QProcess * startup_process = new QProcess(this);
    connect(startup_process, SIGNAL(finished(int)), startup_process, SLOT(deleteLater()));
    startup_process->start(MASTER_PATH);
}
