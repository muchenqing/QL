# Ubuntu 核心操作命令大全（详细注释+可直接复制示例）

<style>
:root {
  --vp-c-bg: #ffffff;
  --vp-c-bg-alt: #f9f9f9;
  --vp-c-text-1: #333333;
  --vp-c-text-2: #666666;
  --vp-c-text-3: #999999;
}

body {
  background-color: #ffffff !important;
}

.vp-doc {
  background-color: #ffffff !important;
}
</style>
适配版本：Ubuntu 18.04/20.04/22.04/24.04
说明：普通用户执行需加 sudo 提权，root 用户可直接执行；注释以 # 标注，示例贴合实际使用场景

## 一、用户&用户组管理（权限核心）
### 1. 用户创建
useradd test1  # 原生命令：仅创建用户，无家目录/登录Shell，适合脚本
sudo adduser test2  # Ubuntu推荐：交互式创建，自动生成家目录/登录Shell，需设置密码（示例：创建用户test2）

### 2. 密码设置/修改
passwd  # 无参数：修改当前登录用户的密码（示例：当前用户ubuntu，直接改ubuntu密码）
sudo passwd test2  # 带参数：修改指定用户密码（示例：修改test2密码，终端不显示输入内容，正常输入即可）

### 3. 用户删除
sudo userdel test1  # 仅删除用户账号，保留家目录/配置文件（示例：删除test1，不删文件）
sudo userdel -r test2  # 推荐：彻底删除用户，同时删除家目录/邮件/配置文件（示例：彻底删除test2）

### 4. 用户切换
su - test2  # 推荐：切换用户并加载其环境变量，执行后输入test2密码（示例：切到test2）
su test2    # 仅切换用户，不加载环境变量，家目录仍为原用户目录
exit        # 退出当前切换的用户，回到原用户（所有切换场景通用）
sudo -i     # 普通用户直接切换到root交互式终端，加载root环境，需输入当前用户密码

### 5. 用户组创建/删除
sudo groupadd dev  # 创建用户组（示例：创建开发组dev）
sudo groupdel dev  # 删除用户组（示例：删除dev组，注意：组是主组时无法直接删除）

### 6. 用户组修改
sudo groupmod -n newdev dev  # 修改组名：-n指定新名，后跟旧名（示例：dev改名为newdev）
sudo groupmod -g 1005 dev    # 修改组GID：-g指定新GID，避免和现有GID冲突（示例：dev设GID=1005）

### 7. 用户与组关联（核心）
sudo usermod -aG dev test2  # 追加用户到附属组：-a=追加（必加），-G=指定组（示例：test2加入dev组）
sudo usermod -g dev test2   # 修改用户主组：-g指定主组，替换原有主组（示例：test2主组设为dev）
# 注意：添加/修改组后，需重新登录用户（su - 用户名）配置才生效

### 8. 用户/组信息查询
groups test2  # 查看指定用户所属所有组（示例：查test2的组）
groups        # 无参数：查看当前用户所属所有组
id test2      # 查看指定用户详细信息：UID/GID/主组/附属组（示例：查test2完整ID）
id            # 无参数：查看当前用户完整ID信息
cat /etc/passwd | cut -d: -f1  # 列出所有用户名（简洁版）
compgen -u                     # 系统专用命令，快速列出所有用户名
cat /etc/group | cut -d: -f1   # 列出所有组名（简洁版）
compgen -g                     # 系统专用命令，快速列出所有组名

### 9. 用户高级配置
sudo usermod -d /home/newtest2 test2  # 修改用户家目录（示例：test2家目录改为/home/newtest2）
sudo usermod -s /bin/bash test2       # 修改登录Shell为可登录（示例：test2设为/bin/bash）
sudo usermod -s /sbin/nologin test2   # 禁止用户登录：Shell设为/sbin/nologin（示例：禁止test2登录）
sudo usermod -L test2  # 锁定用户：禁止登录，保留账号/文件（示例：锁定test2）
sudo usermod -U test2  # 解锁用户：恢复登录权限（示例：解锁test2）

## 二、软件包管理（apt 核心）
### 1. 软件源更新&系统升级
sudo apt update  # 更新软件源索引，获取最新软件版本（安装/升级前必执行）
sudo apt upgrade -y  # 升级所有可升级软件包，-y=自动确认，无需手动输入y
sudo apt full-upgrade -y  # 完整升级：升级同时处理依赖冲突，必要时删除旧包

### 2. 软件安装
sudo apt install -y man-db  # 安装单个软件，-y=自动确认（示例：安装man命令主程序）
sudo apt install -y man-db manpages-zh  # 同时安装多个软件，空格分隔（示例：装man+中文手册）

### 3. 软件卸载
sudo apt remove -y manpages-zh  # 卸载软件，保留配置文件（示例：卸载中文man手册）
sudo apt purge -y manpages-zh   # 彻底卸载：删除软件+所有配置文件（推荐，示例：彻底删中文man手册）
sudo apt autoremove -y  # 自动删除无用依赖包（卸载软件后执行，清理冗余）

### 4. 软件查询
apt search man  # 搜索软件源中含指定关键词的软件（示例：搜索含man的软件）
apt show man-db # 查看指定软件详细信息：版本/依赖/描述（示例：查man-db详情）
dpkg -l | grep man  # 查看系统已安装的含指定关键词的软件（示例：查已安装man相关软件）
dpkg -L man-db      # 查看指定软件的文件安装路径（示例：查man-db所有安装文件位置）

### 5. 缓存清理
sudo apt clean  # 清理软件源缓存的安装包（/var/cache/apt/archives/）
sudo apt autoclean  # 清理过期的缓存包，保留最新版本

## 三、man 手册使用（含中文）
man man  # 查看man命令自身的英文手册
man ls   # 查看指定命令的英文手册（示例：查ls命令）
LANG=zh_CN.UTF-8 man ls  # 临时查看中文手册（示例：查ls中文手册，仅当前终端有效）
LANG=en_US.UTF-8 man ls  # 临时切回英文手册（示例：查ls英文手册，仅当前终端有效）
sudo apt install -y manpages-zh  # 安装man中文手册包

## 四、文件&目录操作（基础通用）
### 1. 目录切换/查看
cd /home  # 切换到绝对路径目录（示例：切到/home）
cd test   # 切换到当前目录下的子目录（示例：切到当前目录test文件夹）
cd ..     # 切换到上一级目录（两个点）
cd ../..  # 切换到上两级目录
cd ~      # 切换到当前用户的家目录（通用）
cd /      # 切换到系统根目录
pwd       # 查看当前所在的绝对路径（必用，确认目录位置）
ls        # 查看当前目录文件/目录（简洁版）
ls -l     # 长格式查看：权限/所有者/大小/修改时间（简写ll，需配置别名）
ls -la    # 查看所有文件：包括隐藏文件（以.开头，示例：ls -la /home）
ls -lh    # 人性化显示文件大小：KB/MB/GB（示例：ls -lh /home）
ls -d */  # 仅查看当前目录下的所有子目录

### 2. 文件/目录创建
mkdir test  # 创建单个目录（示例：当前目录创建test文件夹）
mkdir -p /home/test1/test2  # 递归创建多级目录：-p=父目录不存在则创建（示例：/home/test1/test2）
touch a.txt  # 创建空文件（示例：当前目录创建a.txt）
touch /home/b.txt /home/c.txt  # 同时创建多个文件（示例：/home创建b.txt和c.txt）

### 3. 文件/目录复制
cp a.txt /home  # 复制文件到指定目录（示例：当前a.txt复制到/home）
cp a.txt /home/a_new.txt  # 复制文件并改名（示例：a.txt复制到/home并改a_new.txt）
cp -r test /home  # 复制目录：-r=递归（必加），示例：当前test文件夹复制到/home
cp -rf test /home  # 强制复制：-f=覆盖目标已存在文件/目录（示例：强制复制test到/home）

### 4. 文件/目录移动/改名
mv a.txt /home  # 移动文件到指定目录（示例：a.txt移到/home）
mv test /home   # 移动目录到指定目录（示例：test文件夹移到/home，无需-r）
mv a.txt b.txt  # 文件改名：同一目录下移动即改名（示例：a.txt改b.txt）
mv test test_new  # 目录改名（示例：test改test_new）
mv -f a.txt /home  # 强制移动：覆盖目标已存在文件（示例：强制移a.txt到/home）

### 5. 文件/目录删除
rm a.txt  # 删除单个文件，需手动确认（y=确认，n=取消）
rm -f a.txt  # 强制删除文件：无需确认（示例：强制删a.txt）
rm -r test  # 删除目录：-r=递归，需手动确认（示例：删test文件夹）
rm -rf test  # 强制删除目录：无需确认（核心，谨慎使用，不可恢复）
rm -rf *.txt  # 通配符删除：当前目录所有.txt后缀文件（*表示任意字符）

### 6. 文件查看/编辑
cat a.txt  # 一次性查看文件所有内容（适合小文件，示例：查a.txt）
more a.txt # 分页查看：空格翻页，q退出（适合大文件，示例：查a.txt）
less a.txt # 高级分页：上下键翻行，q退出，支持/关键词搜索（示例：查a.txt）
head a.txt # 查看文件前10行（默认，示例：查a.txt前10行）
head -20 a.txt # 查看前N行（示例：a.txt前20行）
tail a.txt # 查看文件最后10行（默认，示例：a.txt最后10行）
tail -20 a.txt # 查看最后N行（示例：a.txt最后20行）
tail -f a.txt # 实时监控文件：新增内容实时显示，Ctrl+C退出（日志监控必用）
nano a.txt  # 简易编辑：保存Ctrl+O→回车，退出Ctrl+X（示例：编辑a.txt）
vim a.txt   # 专业编辑：退出Esc+:q，保存退出Esc+:wq，强制退出Esc+:q!（示例：编辑a.txt）

### 7. 软链接创建（快捷方式）
ln -s /home/a.txt ./a_link.txt  # 文件软链接：-s=软链接（必加），示例：/home/a.txt在当前目录建快捷方式
ln -s /home/test ./test_link    # 目录软链接：示例：/home/test在当前目录建快捷方式

## 五、权限管理（chmod/chown 核心）
### 1. 权限查看
ls -l a.txt  # 查看文件权限（示例：查a.txt权限，输出如-rw-r--r--）
ls -ld test  # 查看目录权限：-d=仅看目录本身（示例：查test文件夹权限）
# 权限格式说明：-rw-r--r-- 1 root root  0 1月 28 10:00 a.txt
# 第1位：-=文件，d=目录，l=软链接；后9位分3组：所有者(u)/所属组(g)/其他用户(o)
# 每组权限：r=读(4)、w=写(2)、x=执行(1)，无权限为-

### 2. 权限修改（chmod）
# 方式1：数字权限（推荐），三组权限数值相加（如755=4+2+1 / 4+1 /4+1）
sudo chmod 755 a.txt  # 所有者rwx，所属组+其他rx（示例：a.txt设755）
sudo chmod 777 a.txt  # 所有用户rwx（最高权限，谨慎使用，示例：a.txt设777）
sudo chmod -R 755 test  # 递归设置目录权限：-R=目录内所有文件/子目录均应用（示例：test设755）
# 方式2：字母权限，u=所有者，g=所属组，o=其他，a=所有，+=加，-=减，=设
sudo chmod u+x a.txt  # 所有者加执行权限（示例：a.txt所有者加x）
sudo chmod g-w a.txt  # 所属组减写权限（示例：a.txt所属组减w）
sudo chmod a=rwx a.txt # 所有用户设rwx（等价777，示例：a.txt设a=rwx）

### 3. 所有者/所属组修改（chown）
sudo chown root a.txt  # 修改文件所有者（示例：a.txt所有者设为root）
sudo chown :root a.txt # 修改文件所属组（示例：a.txt所属组设为root）
sudo chown root:root a.txt # 同时修改所有者和所属组（示例：a.txt设root/root）
sudo chown -R root:root test # 递归修改目录权限：-R=目录内所有文件均应用（示例：test设root/root）

## 六、系统管理&基础查询
### 1. 系统信息查询
uname -a  # 查看系统完整信息：内核版本/架构/主机名等（必用）
uname -r  # 查看内核版本（示例：5.15.0-91-generic）
cat /etc/os-release  # 查看Ubuntu版本：发行版/版本号/代号（如22.04 Jammy Jellyfish）
hostname  # 查看主机名
hostnamectl set-hostname ubuntu-test  # 修改主机名（示例：改为ubuntu-test，立即生效）

### 2. 磁盘/内存查询
df -h  # 查看磁盘分区使用情况：-h=人性化显示（GB/MB）
du -h a.txt  # 查看文件大小：-h=人性化（示例：查a.txt大小）
du -sh test  # 查看目录总大小：-s=汇总，-h=人性化（示例：查test总大小）
du -h test   # 查看目录及子目录大小：逐层显示（示例：查test详细大小）
free -h      # 查看内存/交换分区使用情况：-h=人性化（总/已用/可用）
free -m      # 以MB为单位查看内存使用

### 3. 进程管理
ps -ef  # 查看所有进程：完整信息（PID/PPID/所有者/命令）
ps -ef | grep java  # 过滤查看指定进程（示例：查java相关进程）
top     # 实时监控进程：动态显示CPU/内存占用，q退出（系统监控必用）
htop    # 高级进程监控：界面更友好（需安装：sudo apt install -y htop）
kill 1234  # 终止指定PID进程：正常终止（信号15，示例：终止PID=1234）
kill -9 1234 # 强制终止进程：-9=强制信号，无响应进程必用（示例：强制终止PID=1234）
pkill java  # 按进程名终止进程（示例：终止所有java相关进程，谨慎使用）

### 4. 网络管理
sudo apt install -y net-tools  # 安装ifconfig/netstat依赖（默认未安装）
ifconfig  # 查看网卡/IP地址（经典命令）
ip a      # 系统内置：查看网卡/IP地址（推荐，无需安装）
ping www.baidu.com  # 测试网络连通性，Ctrl+C退出（示例：ping百度）
netstat -tulnp  # 查看端口占用：-tTCP/-uUDP/-l监听/-n数字/-p进程（示例：查所有端口）
ss -tulnp       # 系统内置：查看端口占用（推荐，功能同netstat）
sudo apt install -y lsof  # 安装lsof依赖（默认未安装）
sudo lsof -i:80  # 查看指定端口占用（示例：查80端口占用进程）

### 5. 关机/重启
sudo reboot  # 立即重启系统
sudo shutdown -r now  # 立即重启（和reboot等价）
sudo shutdown -r 10  # 10分钟后重启
sudo shutdown -h now  # 立即关机
sudo shutdown -h 10  # 10分钟后关机
sudo poweroff        # 立即关机（和shutdown -h now等价）

## 七、压缩&解压（tar/zip 核心）
### 1. tar 压缩/解压（Linux通用，.tar/.tar.gz/.tar.bz2）
# 压缩：-z=gzip/-j=bzip2/-c=创建/-v=显示过程/-f=指定包名（必放最后）
tar -zcvf test.tar.gz test  # 压缩为.tar.gz（最常用，高压缩比，示例：test压缩为test.tar.gz）
tar -jcvf test.tar.bz2 test # 压缩为.tar.bz2（更高压缩比，速度稍慢）
tar -cvf test.tar test      # 仅打包不压缩
# 解压：-x=解压/-C=指定解压目录（无-C则解压到当前目录）
tar -zxvf test.tar.gz -C /home  # 解压.tar.gz到指定目录（示例：解压到/home）
tar -jxvf test.tar.bz2 -C /home # 解压.tar.bz2到指定目录
tar -xvf test.tar -C /home      # 解压.tar包到指定目录

### 2. zip/unzip 压缩/解压（跨平台，Windows/Linux通用）
sudo apt install -y zip unzip  # 安装zip/unzip工具（默认未安装）
zip -r test.zip test  # 压缩为zip包：-r=递归（目录必加，示例：test压缩为test.zip）
unzip test.zip -d /home  # 解压zip包到指定目录：-d=指定目录（示例：解压到/home）
unzip test.zip  # 无-d：解压到当前目录