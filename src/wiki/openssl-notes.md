# RSA应用举例

## 生成私匙和公钥

产生1024位RSA私匙，用3DES加密它，口令为trousers，输出到文件rsaprivatekey.pem

    openssl genrsa -out rsaprivatekey.pem -passout pass:trousers -des3 1024

从文件rsaprivatekey.pem读取私匙，用口令trousers解密，生成的公钥匙输出到文件rsapublickey.pem

    openssl rsa -in rsaprivatekey.pem -passin pass:trousers -pubout -out rsapubckey.pem


## 公私钥加密解密

用公钥匙rsapublickey.pem加密文件plain.txt，输出到文件cipher.txt

    openssl rsautl -encrypt -pubin -inkey rsapublickey.pem -in plain.txt -out cipher.txt


使用私钥匙rsaprivatekey.pem解密密文cipher.txt，输出到文件plain.txt

    openssl rsautl -decrypt -inkey rsaprivatekey.pem -in cipher.txt -out plain.txt

## 签名

用私钥匙rsaprivatekey.pem给文件plain.txt签名，输出到文件signature.bin

    openssl rsautl -sign -inkey rsaprivatekey.pem -in plain.txt -out signature.bin

用公钥匙rsapublickey.pem验证签名signature.bin，输出到文件plain.txt

    openssl rsautl -verify -pubin -inkey rsapublickey.pem -in signature.bin -out plain


# 对称加密

    openssl enc -aes-256-cbc -salt -in update.tar.xz -out update.tar.xz.enc -pass file:./key.bin