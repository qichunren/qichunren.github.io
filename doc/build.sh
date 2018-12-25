#/bin/sh
find ./source -name "*" -exec touch {} \;

make html
