#!/etc/sh
rm ./output -fr 
echo 'ready rm output'
fis3 release dev
echo 'ready fis3 release'
tree ./output
