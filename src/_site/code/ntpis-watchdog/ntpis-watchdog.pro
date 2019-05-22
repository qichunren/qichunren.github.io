#-------------------------------------------------
#
# Project created by QtCreator 2017-02-15T11:34:17
#
#-------------------------------------------------

QT       += core network

QT       -= gui

TARGET = ../../bin/ntpis160-watchdog
CONFIG   += console
CONFIG   -= app_bundle

TEMPLATE = app

target.path = /usr/local/bin/
INSTALLS += target


SOURCES += main.cpp nt_dog.cpp nt_local_client.cpp

HEADERS  += nt_dog.h nt_local_client.h
