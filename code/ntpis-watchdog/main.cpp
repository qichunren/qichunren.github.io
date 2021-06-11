/*
# Copyright (c) 2016 Shanghai Novotech. All rights reserved.
*/

#include <QCoreApplication>

#include <unistd.h>
#include <cstdio>

#include "nt_dog.h"

#define OrganizationName "ShanghaiNT"
#define OrganizationDomain "shanghainovotech.com"
#define APP_DESC "NT PIS watchdog"
#define APP_NAME "ntpis-watchdog"
#define APP_VERSION "v1.0.0"
#define USER_AGENT APP_NAME " " APP_VERSION
#define BUILD_DATE ""__TIME__"," __DATE__

int main(int argc, char *argv[])
{
    bool is_daemon = false;
    for (u_int8_t i=0;i<argc;i++) {
        if (strcmp(argv[i], "-h") == 0 || strcmp(argv[i], "--help") == 0) {
            const char *qt_version = qVersion();
            printf("Compiled with Qt Version %s, runtime version %s\n", QT_VERSION_STR, qt_version);
            puts(APP_NAME " " APP_VERSION " build at " BUILD_DATE);
            puts("Watch ntpis160 app alive:");
            puts("Arguments:");
            puts("  -d, --daemon  : Run as a deamon.");
            puts("  -v, --version  : Show app version.");
            puts("");
            exit(1);
        }
        if (strcmp(argv[i], "-v") == 0 || strcmp(argv[i], "--version") == 0) {
            puts(APP_NAME " " APP_VERSION " build at " BUILD_DATE);
            exit(1);
        }
        if (strcmp (argv[i], "-d") == 0 || strcmp (argv[i], "--daemon") == 0) {
            is_daemon = true;
        }
    }
    if (is_daemon)
        daemon(0, 0);

    QCoreApplication a(argc, argv);
    NtDog dog;
    return a.exec();
}
