# diffpass
Generates different passwords for your accounts

## Installation

```
npm install -g diffpass
```

## Usage

### Basic usage
Input the software name(or other information) and your common password, then you will get a safe password with lowercase letters, 
uppercase letters and digits. The default length is 16.

```
$ diffpass
Software name: github
Common password: ******

mhfygyeQvfyeb7Z7
```

or you can input the software name after `diffpass` in the same line.

```
$ diffpass github
Common password: ******

mhfygyeQvfyeb7Z7
```

### Use options

```
$ diffpass github -s -l 10
Common password: ******

mh&4*yg+1L
```

`-l <n>`: Set the length of the password. The default length is 16.

`-s`: Add symbols into the password. (e.g. !@#$%)
