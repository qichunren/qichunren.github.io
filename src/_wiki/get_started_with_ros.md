---
layout: single
position: Developer
---

## Get Started with ROS

I assume you are familiar with Ubuntu OS and C++/Python development.

1. Browse [ROS Wiki](http://wiki.ros.org/) to [install](http://wiki.ros.org/ROS/Installation) ROS packages on you work pc.

2. Follow [ROS Tutorials](http://wiki.ros.org/ROS/Tutorials) to see how ros apps work.

3. Construe *node*, *topic*, *service*, *message* in ROS.

4. Follow book *<ROS by example volume 1>* and *<ROS by example volume 2>*.

Continue to move forward

## Resources links


https://www.clearpathrobotics.com/assets/guides/ros/index.html

https://erlerobotics.gitbooks.io/erlerobot/content/en/index.html
http://learn.turtlebot.com/
http://www.cnblogs.com/cv-pr/

#### Install ROS on Ubuntu ARM


[Install ROS on Ubuntu ARM](http://wiki.ros.org/indigo/Installation/UbuntuARM)

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


### ROS Book list

* A Gentle Introduction to ROS
* Learning Robotics Using Python
* Learning ROS for Robotics Programming
* ROS by example volume 1
* ROS by example volume 2