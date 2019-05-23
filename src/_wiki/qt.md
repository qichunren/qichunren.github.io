---
layout: single
title: "QT Notes"
date: 2014-03-30 12:04
comments: false
footer: false
---

## QT Console application pro file:

    #-------------------------------------------------
    #
    # Project created by QtCreator 2014-03-31T13:20:57
    #
    #-------------------------------------------------

    QT       += core

    QT       -= gui

    TARGET = Todo
    CONFIG   += console
    CONFIG   -= app_bundle

    TEMPLATE = app


    SOURCES += main.cpp

## QT Widget application pro file:

<pre>
#-------------------------------------------------
#
# Project created by QtCreator 2014-03-31T13:27:53
#
#-------------------------------------------------

QT       += core gui

greaterThan(QT_MAJOR_VERSION, 4): QT += widgets

TARGET = Todo
TEMPLATE = app


SOURCES += main.cpp\
        mainwindow.cpp

HEADERS  += mainwindow.h

FORMS    += mainwindow.ui
</pre>

## Qt Quick application pro file:
<pre>
# Add more folders to ship with the application, here
folder_01.source = qml/Todo
folder_01.target = qml
DEPLOYMENTFOLDERS = folder_01

# Additional import path used to resolve QML modules in Creator's code model
QML_IMPORT_PATH =

# The .cpp file which was generated for your project. Feel free to hack it.
SOURCES += main.cpp

# Installation path
# target.path =

# Please do not modify the following two lines. Required for deployment.
include(qtquick2applicationviewer/qtquick2applicationviewer.pri)
qtcAddDeployment()
</pre>