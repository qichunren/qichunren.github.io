---
layout: single
title: Capture all reqeust web page send
date: 2016-03-24 10:10
comments: true
categories: Development
---

The main process is to set QNetworkAccessManager instance to a QWebPage object, then use finished signal to capture QNetworkReply reply.

```
MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{
    ui->setupUi(this);
    QWebSettings::globalSettings()->setAttribute(QWebSettings::PluginsEnabled, true);
    QWebSettings::globalSettings()->setAttribute(QWebSettings::AutoLoadImages, true);
    QWebSettings::globalSettings()->setAttribute(QWebSettings::JavascriptEnabled, true);
    QWebSettings::globalSettings ()->setAttribute (QWebSettings::DeveloperExtrasEnabled, true);
    static QWebView * view;
    view = new QWebView(this);
    ui->verticalLayout->addWidget(view);
    nm = new QNetworkAccessManager(this);
    QNetworkRequest *request = new QNetworkRequest(QUrl("http://music.baidu.com/song/s/6307e667db90856f3ab7c?fm=altg_new3"));
    QWebPage *page = new QWebPage();
    page->settings()->setAttribute(QWebSettings::PluginsEnabled, true);
    page->setNetworkAccessManager(nm);
    connect(nm, SIGNAL(finished(QNetworkReply*)), this, SLOT(when_reply_finished(QNetworkReply*)));
  //  const QWebFrame *frame = page->mainFrame();
    view->setPage(page);
    view->load(*request);

}

MainWindow::~MainWindow()
{
    delete ui;
}


void MainWindow::when_reply_finished(QNetworkReply *reply) {
    const QString &url = reply->url().toString();
    qDebug() << url;
}
```