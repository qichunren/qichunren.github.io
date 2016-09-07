


https://www.clearpathrobotics.com/assets/guides/ros/index.html

https://erlerobotics.gitbooks.io/erlerobot/content/en/index.html
http://learn.turtlebot.com/
http://www.cnblogs.com/cv-pr/

1. [Install ROS on Ubuntu ARM](http://wiki.ros.org/indigo/Installation/UbuntuARM)

sudo update-locale LANG=C LANGUAGE=C LC_ALL=C LC_MESSAGES=POSIX
sudo sh -c 'echo "deb http://packages.ros.org/ros/ubuntu trusty main" > /etc/apt/sources.list.d/ros-latest.list'
sudo apt-key adv --keyserver hkp://ha.pool.sks-keyservers.net --recv-key 0xB01FA116
sudo apt-get update
sudo apt-get install ros-indigo-ros-base
sudo apt-get install python-rosdep
sudo rosdep init
rosdep update
echo "source /opt/ros/indigo/setup.bash" >> ~/.bashrc
source ~/.bashrc
sudo apt-get install python-rosinstall


root@arm:~# printenv | grep ROS
ROS_ROOT=/opt/ros/indigo/share/ros
ROS_PACKAGE_PATH=/opt/ros/indigo/share:/opt/ros/indigo/stacks
ROS_MASTER_URI=http://localhost:11311
ROSLISP_PACKAGE_DIRECTORIES=
ROS_DISTRO=indigo
ROS_ETC_DIR=/opt/ros/indigo/etc/ros



2. http://wiki.ros.org/ROS/Tutorials/InstallingandConfiguringROSEnvironment

root@arm:~/catkin_ws# echo $ROS_PACKAGE_PATH
/home/qichunren/catkin_ws/src:/opt/ros/indigo/share:/opt/ros/indigo/stacks


3. http://wiki.ros.org/ROS/Tutorials/NavigatingTheFilesystem


cd ~/catkin_ws
catkin_make