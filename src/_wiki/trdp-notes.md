---
layout: single
title: TRDP Notes
date: 2019-08-29 15:29
comments: false
---


0. Include headers:

    #include <stdio.h>
    #include <stdlib.h>
    #include <string.h>

    #if defined (POSIX)
    #include <unistd.h>
    #include <sys/select.h>
    #elif (defined (WIN32) || defined (WIN64))
    #include "getopt.h"
    #endif

    #include "trdp_if_light.h"
    #include "vos_thread.h"
    #include "vos_utils.h"


1. Init the library:
    tlc_init

2. Open a session:
    
    tlc_openSession(&appHandle,
                        ownIP, 0,               /* use default IP address           */
                        NULL,                   /* no Marshalling                   */
                        &pdConfiguration, NULL, /* system defaults for PD and MD    */
                        &processConfig)

3. Copy the packet into the internal send queue, prepare for sending. If we change the data, just re-publish it
    
    tlp_publish(  appHandle,                  /*    our application identifier    */
                        &pubHandle,                 /*    our pulication identifier     */
                        NULL, NULL,
                        0u,
                        comId,                      /*    ComID to send                 */
                        0u,                          /*    etbTopoCnt = 0 for local consist only     */
                        0u,                          /*    opTopoCnt = 0 for non-directinal data     */
                        ownIP,                      /*    default source IP             */
                        destIP,                     /*    where to send to              */
                        cycleTime,                  /*    Cycle time in us              */
                        0u,                          /*    not redundant                 */
                        TRDP_FLAGS_NONE,            /*    Use callback for errors       */
                        NULL,                       /*    default qos and ttl           */
                        (UINT8 *)outputBuffer,      /*    initial data                  */
                        outputBufferSize            /*    data size                     */
                        );

4. In a while loop:

    /*
        Check for overdue PDs (sending and receiving)
        Send any pending PDs if it's time...
        Detect missing PDs...
        'rv' will be updated to show the handled events, if there are
        more than one...
        The callback function will be called from within the tlc_process
        function (in it's context and thread)!
    */
    (void) tlc_process(appHandle, &rfds, &rv);

5. Fill send data:
    tlp_put(appHandle, pubHandle, outputBuffer, outputBufferSize);

6. Terminate:

    /*
     *    We always clean up behind us!
     */
    tlp_unpublish(appHandle, pubHandle);
    tlc_closeSession(appHandle);
    tlc_terminate();