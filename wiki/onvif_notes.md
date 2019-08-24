# ONVIF NOTES

Install gsoap tool:

    sudo apt-get install gsoap

View what gsoap deb package include:

    dpkg -L gsoap

[Getting Started with gSOAP](https://www.genivia.com/dev.html)

    cd onvif/
    wsdl2h -o onvif.h -c -s  http://www.onvif.org/onvif/ver10/network/wsdl/remotediscovery.wsdl
    soapcpp2 -C -x onvif.h