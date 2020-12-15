# Blueprint

![logo](https://siasky.net/EACyoXDqOUO61hZ7-qnF_DZOs7UJuMUjn7HL7eQeD0XQ7A)  
![GitHub package.json version](https://img.shields.io/github/package-json/v/xpyxel/blueprint?style=flat-square)
![GitHub forks](https://img.shields.io/github/forks/xpyxel/blueprint?style=flat-square)
![GitHub Repo stars](https://img.shields.io/github/stars/xpyxel/blueprint?style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/xpyxel/blueprint?style=flat-square)
![GitHub](https://img.shields.io/github/license/xpyxel/blueprint?style=flat-square)  
A modern, powerful, experimental, and modular Discord bot framework

## Installation

To install Blueprint you first need to configure NPM to use the GitHub package registry,
to do this first create a `.npmrc` file with the following contents, afterwords you can install the library using `npm i @xpyxel/blueprint`.

**Note:** You must be logged into the GitHub package registry before this will work.

```npmrc
@xpyxel:registry=https://npm.pkg.github.com
```

## Database Support

Blueprint uses [TypeORM](https://typeorm.io/#/) for database management and support, however to actually
use the library with your database of choice you will need to install the driver for said database. An
example of a driver is the [MongoDB](https://www.npmjs.com/package/mongodb) driver. For more information on
this read the ["Connection Options"](https://typeorm.io/#/connection-options) section on TypeORM's website.

## Logging Support

For logging Blueprint uses [Log4JS](https://www.npmjs.com/package/log4js), it is a very complex and powerful logging system
that was originally made for java known as Log4J, the configuration is very powerful, for more information on how to configure 
logging with Log4JS, and Blueprint, you can read up on it on their website [here](https://log4js-node.github.io/log4js-node/).
