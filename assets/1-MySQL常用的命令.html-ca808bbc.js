import{_ as e,o as a,c as i,e as s}from"./app-66d6b4fd.js";const d={},l=s(`<h1 id="mysql常用的命令" tabindex="-1"><a class="header-anchor" href="#mysql常用的命令" aria-hidden="true">#</a> MySQL常用的命令</h1><h2 id="启动与登录" tabindex="-1"><a class="header-anchor" href="#启动与登录" aria-hidden="true">#</a> 启动与登录</h2><h3 id="启动-windows" tabindex="-1"><a class="header-anchor" href="#启动-windows" aria-hidden="true">#</a> 启动(windows)</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 启动
net start mysql服务名称
# 停止
net stop mysql服务名称
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="登录" tabindex="-1"><a class="header-anchor" href="#登录" aria-hidden="true">#</a> 登录</h3><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql –h hostname|hostIP –P port –u username –p DatabaseName –e &quot;SQL语句&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><strong>-h参数</strong> 后面接主机名或者主机IP，hostname为主机，hostIP为主机IP。</li><li><strong>-P参数</strong> 后面接MySQL服务的端口，通过该参数连接到指定的端口。MySQL服务的默认端口是3306， 不使用该参数时自动连接到3306端口，port为连接的端口号。</li><li><strong>-u参数</strong> 后面接用户名，username为用户名。</li><li><strong>-p参数</strong> 会提示输入密码。</li><li><strong>DatabaseName参数</strong> 指明登录到哪一个数据库中。如果没有该参数，就会直接登录到MySQL数据库 中，然后可以使用USE命令来选择数据库。</li><li><strong>-e参数</strong> 后面可以直接加SQL语句。登录MySQL服务器以后即可执行这个SQL语句，然后退出MySQL 服务器。</li></ul><p><strong>举例</strong></p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql -uroot -p -hlocalhost -P3306 mysql -e &quot;select host,user from mysql.user&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="用户相关" tabindex="-1"><a class="header-anchor" href="#用户相关" aria-hidden="true">#</a> 用户相关</h2><h3 id="创建用户" tabindex="-1"><a class="header-anchor" href="#创建用户" aria-hidden="true">#</a> 创建用户</h3><p>CREATE USER语句的基本语法形式如下：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE USER 用户名 [IDENTIFIED BY &#39;密码&#39;] [,用户名 [IDENTIFIED BY &#39;密码&#39;]];
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>用户名参数表示新建用户的账户，由 用户（User） 和 主机名（Host） 构成；</li><li>“[ ]”表示可选，也就是说，可以指定用户登录时需要密码验证，也可以不指定密码验证，这样用户 可以直接登录。不过，不指定密码的方式不安全，不推荐使用。如果指定密码值，这里需要使用 IDENTIFIED BY指定明文密码值。</li><li>CREATE USER语句可以同时创建多个用户。</li></ul><p><strong>举例</strong></p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE USER zhang3 IDENTIFIED BY &#39;123123&#39;; # 默认host是 %
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE USER &#39;kayson&#39;@&#39;localhost&#39; IDENTIFIED BY &#39;123456&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>查询当前用户</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>select user();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="查询用户" tabindex="-1"><a class="header-anchor" href="#查询用户" aria-hidden="true">#</a> 查询用户</h3><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT host,user,authentication_string,select_priv,insert_priv,drop_priv
FROM mysql.user;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="修改用户" tabindex="-1"><a class="header-anchor" href="#修改用户" aria-hidden="true">#</a> 修改用户</h3><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>UPDATE mysql.user SET USER=&#39;li4&#39; WHERE USER=&#39;wang5&#39;;
# 刷新，来使用户生效
FLUSH PRIVILEGES;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="删除用户" tabindex="-1"><a class="header-anchor" href="#删除用户" aria-hidden="true">#</a> 删除用户</h3><ul><li>方式一：使用DROP方式删除（推荐）</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>DROP USER user[,user]…;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>举例</strong></p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>DROP USER li4 ; # 默认删除host为%的用户
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>DROP USER &#39;kayson&#39;@&#39;localhost&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>方式二：使用DELETE方式删除</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>DELETE FROM mysql.user WHERE Host=’hostname’ AND User=’username’;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">注意</p><p>不推荐通过 DELETE FROM USER u WHERE USER=&#39;li4&#39; 进行删除，系统会有残留信息保 留。而drop user命令会删除用户以及对应的权限，执行命令后你会发现mysql.user表和mysql.db表 的相应记录都消失了。</p></div><h3 id="设置当前用户密码" tabindex="-1"><a class="header-anchor" href="#设置当前用户密码" aria-hidden="true">#</a> 设置当前用户密码</h3><ul><li>方式一：使用ALTER USER命令来修改当前用户密码</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>ALTER USER USER() IDENTIFIED BY &#39;new_password&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>方式二：使用SET语句来修改当前用户密码</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SET PASSWORD=&#39;new_password&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="修改其它用户密码" tabindex="-1"><a class="header-anchor" href="#修改其它用户密码" aria-hidden="true">#</a> 修改其它用户密码</h3><ul><li>方式一：使用ALTER语句来修改普通用户的密码</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>ALTER USER user [IDENTIFIED BY &#39;新密码&#39;][,user[IDENTIFIED BY &#39;新密码&#39;]]…;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>举例</strong></p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>ALTER USER zhang3 IDENTIFIED BY &#39;123456&#39;; # 默认修改host为%的用户
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>ALTER USER &#39;kayson&#39;@&#39;localhost&#39; IDENTIFIED BY &#39;123123&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>方式二：使用SET命令来修改普通用户的密码</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SET PASSWORD FOR &#39;username&#39;@&#39;hostname&#39;=&#39;new_password&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="权限相关" tabindex="-1"><a class="header-anchor" href="#权限相关" aria-hidden="true">#</a> 权限相关</h2><h3 id="查看权限列表" tabindex="-1"><a class="header-anchor" href="#查看权限列表" aria-hidden="true">#</a> 查看权限列表</h3><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>show privileges;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><strong>CREATE和DROP权限</strong> ，可以创建新的数据库和表，或删除（移掉）已有的数据库和表。如果将 MySQL数据库中的DROP权限授予某用户，用户就可以删除MySQL访问权限保存的数据库。</li><li><strong>SELECT、INSERT、UPDATE和DELETE权限</strong> 允许在一个数据库现有的表上实施操作。</li><li><strong>SELECT权限</strong> 只有在它们真正从一个表中检索行时才被用到。</li><li><strong>INDEX权限</strong> 允许创建或删除索引，INDEX适用于已 有的表。如果具有某个表的CREATE权限，就可以在CREATE TABLE语句中包括索引定义。</li><li><strong>ALTER权限</strong> 可以使用ALTER TABLE来更改表的结构和重新命名表。</li><li><strong>CREATE ROUTINE权限</strong> 用来创建保存的 程序（函数和程序），ALTER ROUTINE权限用来更改和删除保存的程序， EXECUTE权限 用来执行保存的 程序。</li><li><strong>GRANT权限</strong> 允许授权给其他用户，可用于数据库、表和保存的程序。</li><li><strong>FILE权限</strong> 使用 户可以使用LOAD DATA INFILE和SELECT ... INTO OUTFILE语句读或写服务器上的文件，任何被授予FILE权 限的用户都能读或写MySQL服务器上的任何文件（说明用户可以读任何数据库目录下的文件，因为服务 器可以访问这些文件）。</li></ul><h3 id="授予权限" tabindex="-1"><a class="header-anchor" href="#授予权限" aria-hidden="true">#</a> 授予权限</h3><p>授权命令：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>GRANT 权限1,权限2,…权限n ON 数据库名称.表名称 TO 用户名@用户地址 [IDENTIFIED BY ‘密码口令’];
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该权限如果发现没有该用户，则会直接新建一个用户。</p><ul><li>给li4用户用本地命令行方式，授予db1这个库下的所有表的插删改查的权限。</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>GRANT SELECT,INSERT,DELETE,UPDATE ON db1.* TO li4@localhost ;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>授予通过网络方式登录的joe用户 ，对所有库所有表的全部权限，密码设为123。注意这里唯独不包 括grant的权限</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>GRANT ALL PRIVILEGES ON *.* TO joe@&#39;%&#39; IDENTIFIED BY &#39;123&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="查看权限" tabindex="-1"><a class="header-anchor" href="#查看权限" aria-hidden="true">#</a> 查看权限</h3><ul><li>查看当前用户权限</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SHOW GRANTS;
# 或
SHOW GRANTS FOR CURRENT_USER;
# 或
SHOW GRANTS FOR CURRENT_USER();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>查看某用户的全局权限</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SHOW GRANTS FOR &#39;user&#39;@&#39;主机地址&#39; ;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="收回权限" tabindex="-1"><a class="header-anchor" href="#收回权限" aria-hidden="true">#</a> 收回权限</h3><p>收回权限命令</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>REVOKE 权限1,权限2,…权限n ON 数据库名称.表名称 FROM 用户名@用户地址;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="数据库操作相关" tabindex="-1"><a class="header-anchor" href="#数据库操作相关" aria-hidden="true">#</a> 数据库操作相关</h2><h3 id="创建数据库" tabindex="-1"><a class="header-anchor" href="#创建数据库" aria-hidden="true">#</a> 创建数据库</h3><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>create database 数据库名;
create database 数据库名 character set 字符集;

# 如果创建之后 修改数据库编码
ALTER DATABASE 数据库名 CHARACTER SET=utf8;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="查看数据库" tabindex="-1"><a class="header-anchor" href="#查看数据库" aria-hidden="true">#</a> 查看数据库</h3><ul><li>查看数据库MySQL服务器中的所有的数据库:</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>show databases;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>查看某个数据库的定义的信息:</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>show create database 数据库名;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>查看正在使用的数据库</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>select database();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>查询数据库版本</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>select version();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="删除数据库" tabindex="-1"><a class="header-anchor" href="#删除数据库" aria-hidden="true">#</a> 删除数据库</h3><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>drop database 数据库名称;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="切换数据库" tabindex="-1"><a class="header-anchor" href="#切换数据库" aria-hidden="true">#</a> 切换数据库</h3><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>use 数据库名;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="表操作相关" tabindex="-1"><a class="header-anchor" href="#表操作相关" aria-hidden="true">#</a> 表操作相关</h2><h3 id="创建表" tabindex="-1"><a class="header-anchor" href="#创建表" aria-hidden="true">#</a> 创建表</h3><p>方式一：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>create table 表名(
   字段名 类型(长度) 约束,
   字段名 类型(长度) 约束
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>方式二：从已有表创建新表(复制表结构)</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>create table 表名 like 数据库.表名;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="查看表" tabindex="-1"><a class="header-anchor" href="#查看表" aria-hidden="true">#</a> 查看表</h3><ul><li>查看数据库中的所有表：</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>show tables;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>查看表结构：</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>desc 表名;
# or
SHOW COLUMNS FROM 表名;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>查看忘记写comment注释信息的字段</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>show full columns from 表名 where comment = &#39;&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>查看建表语句</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SHOW CREATE TABLE 表名;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="删除表" tabindex="-1"><a class="header-anchor" href="#删除表" aria-hidden="true">#</a> 删除表</h3><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>drop table 表名;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="修改表" tabindex="-1"><a class="header-anchor" href="#修改表" aria-hidden="true">#</a> 修改表</h3><h4 id="给表添加列" tabindex="-1"><a class="header-anchor" href="#给表添加列" aria-hidden="true">#</a> 给表添加列</h4><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>alter table 表名 add 列名 类型(长度) 约束;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>添加多个字段</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code># 添加多个列方法一
ALTER TABLE student
ADD address VARCHAR(200) NOT NULL,
ADD home_tel CHAR(11) NOT NULL;

# 添加多个列方法二
ALTER TABLE student
ADD (address VARCHAR(200) NOT NULL,home_tel CHAR(11) NOT NULL);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>将这个字段添加到某个字段之后</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>alter table 表名 add 列名 类型(长度) 约束 after 某个字段;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>新增列的时候，也可以同时新增索引</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>ALTER TABLE student
ADD address VARCHAR(200) NOT NULL,
ADD home_tel CHAR(11) NOT NULL AFTER address,
ADD INDEX idx_student_address (address),
ADD INDEX idx_student_phone (phone);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="修改列的类型长度及约束" tabindex="-1"><a class="header-anchor" href="#修改列的类型长度及约束" aria-hidden="true">#</a> 修改列的类型长度及约束</h4><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>alter table 表名 modify 列名 类型(长度) 约束;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>为分类表的分类名称字段进行修改，类型varchar(50) 添加约束 not null</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>ALTER TABLE sort MODIFY sname VARCHAR(50) NOT NULL;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>修改多个字段（同添加多个字段，ADD替换为MODIFY）</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>ALTER TABLE student
MODIFY address VARCHAR(200) NOT NULL,
MODIFY home_tel CHAR(11) NOT NULL;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="修改列名" tabindex="-1"><a class="header-anchor" href="#修改列名" aria-hidden="true">#</a> 修改列名</h4><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>alter table 表名 change 旧列名 新列名 类型(长度) 约束;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>为分类表的分类名称字段进行更换 更换为 snamesname varchar(30)</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>ALTER TABLE sort CHANGE sname snamename VARCHAR(30);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>修改多个字段（同添加多个字段）</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>ALTER TABLE student
MODIFY address new_addr VARCHAR(200) NOT NULL,
MODIFY home_tel new_tel CHAR(11) NOT NULL;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="删除列" tabindex="-1"><a class="header-anchor" href="#删除列" aria-hidden="true">#</a> 删除列</h4><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>alter table 表名 drop 列名;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>删除分类表中snamename这列</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>ALTER TABLE sort DROP snamename;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>删除多个字段（同添加多个字段）</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>ALTER TABLE student
DROP home_address,
DROP home_tel;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="修改表名" tabindex="-1"><a class="header-anchor" href="#修改表名" aria-hidden="true">#</a> 修改表名</h4><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>rename table 表名 to 新表名;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>为分类表sort 改名成 category</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>RENAME TABLE sort TO category;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="修改表的字符集" tabindex="-1"><a class="header-anchor" href="#修改表的字符集" aria-hidden="true">#</a> 修改表的字符集</h4><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>alter table 表名 character set 字符集;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>为分类表 category 的编码表进行修改，修改成 gbk</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>ALTER TABLE category CHARACTER SET gbk;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="字段属性相关" tabindex="-1"><a class="header-anchor" href="#字段属性相关" aria-hidden="true">#</a> 字段属性相关</h2><h3 id="主键" tabindex="-1"><a class="header-anchor" href="#主键" aria-hidden="true">#</a> 主键</h3><h4 id="增加主键" tabindex="-1"><a class="header-anchor" href="#增加主键" aria-hidden="true">#</a> 增加主键</h4><ul><li>方式一：在创建表的时候，直接在字段之后，添加 primary key 关键字</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    age INT NOT NULL
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>方式二：在创建表的时候，在所有字段之后，添加 primary key (主键字段列表)</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE TABLE students (
    student_id INT NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    age INT NOT NULL,
    PRIMARY KEY (student_id)
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>方式三：已创建表之后，且已存在主键，使用primary key（主键字段列表）来修改主键（如果有多个字段作为主键，可以是复合主键）</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>ALTER TABLE employees 
DROP PRIMARY KEY, 
ADD PRIMARY KEY (employee_id, first_name);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>先删除原来主键，再新增联合主键</p><ul><li>方式四：已创建表之后，但不存在主键，使用primary key (主键字段列表)来创建主键</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>ALTER TABLE 表名 ADD PRIMARY KEY (列名);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="删除主键" tabindex="-1"><a class="header-anchor" href="#删除主键" aria-hidden="true">#</a> 删除主键</h4><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>ALTER TABLE products DROP PRIMARY KEY;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="自动增长" tabindex="-1"><a class="header-anchor" href="#自动增长" aria-hidden="true">#</a> 自动增长</h3><h4 id="新增自增长-auto-increment" tabindex="-1"><a class="header-anchor" href="#新增自增长-auto-increment" aria-hidden="true">#</a> 新增自增长（AUTO_INCREMENT）</h4><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE TABLE students (
  id INT AUTO_INCREMENT,
  name VARCHAR(50),
  age INT,
  PRIMARY KEY (id)
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>假设数据库名为 <code>my_database</code>，获取 <code>students</code> 表的下一个自增长值：</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT AUTO_INCREMENT
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_SCHEMA = &#39;my_database&#39; AND TABLE_NAME = &#39;students&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>设置起始值和递增步长：</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code># 起始值
SET @@auto_increment_offset=100;
# 步长
SET @@auto_increment_increment=2;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="修改自增长" tabindex="-1"><a class="header-anchor" href="#修改自增长" aria-hidden="true">#</a> 修改自增长</h4><ul><li>修改自增长的值只能比当前已有的自增长的最大值大，不能小（小不生效），向上修改可以。</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>ALTER TABLE employees AUTO_INCREMENT = 2;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="删除自增长" tabindex="-1"><a class="header-anchor" href="#删除自增长" aria-hidden="true">#</a> 删除自增长</h4><ul><li>删除自增长，即修改列的类型</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>ALTER TABLE employees MODIFY emp_id INT;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="唯一键" tabindex="-1"><a class="header-anchor" href="#唯一键" aria-hidden="true">#</a> 唯一键</h3><h4 id="增加唯一键" tabindex="-1"><a class="header-anchor" href="#增加唯一键" aria-hidden="true">#</a> 增加唯一键</h4><ul><li>方式一：在创建表的时候，字段之后直接跟 <code>UNIQUE</code> 或 <code>UNIQUE KEY</code>：</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE TABLE employees (
    employee_id INT,
    first_name VARCHAR(50) UNIQUE,
    last_name VARCHAR(50),
    age INT NOT NULL
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>方式二：在所有的字段之后增加 <code>UNIQUE KEY(字段列表)</code> 来创建唯一键或复合唯一键</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE TABLE employees (
    employee_id INT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    age INT NOT NULL,
    UNIQUE KEY (first_name, last_name)
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>方式三：在创建表之后增加唯一键</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code> ALTER TABLE employees ADD UNIQUE (first_name);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="删除唯一键" tabindex="-1"><a class="header-anchor" href="#删除唯一键" aria-hidden="true">#</a> 删除唯一键</h4><ul><li>方式一：其中 <code>key_name</code> 是要删除的唯一键的名称。</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>ALTER TABLE 表名 DROP UNIQUE key_name;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>其中 <code>index_name</code> 是要删除的唯一键的名称</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>ALTER TABLE 表名 DROP INDEX index_name;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="外键" tabindex="-1"><a class="header-anchor" href="#外键" aria-hidden="true">#</a> 外键</h3><h4 id="增加外键" tabindex="-1"><a class="header-anchor" href="#增加外键" aria-hidden="true">#</a> 增加外键</h4><ul><li><p>方式一：创建表的时候增加外键，在所有的表字段之后，使用foreign key(外键字段) references 外部表(主键字段)</p><p>首先创建一个主表：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE TABLE departments (
  dept_id INT NOT NULL,
  dept_name VARCHAR(50),
  PRIMARY KEY (dept_id)
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后在创建员工表的时候，定义dept_id作为外键，引用departments表的dept_id字段：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE TABLE employees (
  emp_id INT NOT NULL,
  emp_name VARCHAR(50),
  dept_id INT,
  PRIMARY KEY (emp_id),
  FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>方式二：在创建表之后增加外键，添加外键之前，需要保证数据的一致性。</p></li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>alter table 表名 add [constraint 外键名字] foreign key(外键字段) references 父表(主键字段)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="查看外键" tabindex="-1"><a class="header-anchor" href="#查看外键" aria-hidden="true">#</a> 查看外键</h4><ul><li>方式一：查看建表语句</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SHOW CREATE TABLE employees;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>方式二：通过表<code>INFORMATION_SCHEMA.KEY_COLUMN_USAGE</code></li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT 
    TABLE_NAME,
    COLUMN_NAME,
    CONSTRAINT_NAME, 
    REFERENCED_TABLE_NAME,
    REFERENCED_COLUMN_NAME
FROM
    INFORMATION_SCHEMA.KEY_COLUMN_USAGE
WHERE
    TABLE_SCHEMA = &#39;your_database_name&#39; AND
    TABLE_NAME = &#39;employees&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="删除外键" tabindex="-1"><a class="header-anchor" href="#删除外键" aria-hidden="true">#</a> 删除外键</h4><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>alter table 表名 drop foreign key 外键名;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="索引" tabindex="-1"><a class="header-anchor" href="#索引" aria-hidden="true">#</a> 索引</h3><h4 id="创建索引" tabindex="-1"><a class="header-anchor" href="#创建索引" aria-hidden="true">#</a> 创建索引</h4><ul><li>方式一：创建表的时候，添加<code>INDEX 索引名称 (字段)</code></li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE TABLE t_message(
	id INT UNSIGNED PRIMARY KEY,
	content VARCHAR(200) NOT NULL,
	type ENUM(&quot;公告&quot;, &quot;通报&quot;, &quot;个人通知&quot;) NOT NULL,
	create_time TIMESTAMP NOT NULL,
	INDEX idx_type (type)
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>方式二：创建表之后，向已存在的表中添加索引</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code># 普通索引
CREATE INDEX 索引名称 ON 表名(字段); # 方式2-1
ALTER TABLE 表名 ADD INDEX 索引名称(字段); # 方式2-2

# 唯一索引
CREATE UNIQUE INDEX 索引名称 ON 表名(字段); # 方式2-3

# 联合索引
CREATE INDEX 索引名称 ON 表名(字段1，字段2...); # 方式2-4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="查看索引" tabindex="-1"><a class="header-anchor" href="#查看索引" aria-hidden="true">#</a> 查看索引</h4><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SHOW INDEX FROM 表名;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="删除索引" tabindex="-1"><a class="header-anchor" href="#删除索引" aria-hidden="true">#</a> 删除索引</h4><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>DROP INDEX 索引名称 ON 表名;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="数据相关-增删改查" tabindex="-1"><a class="header-anchor" href="#数据相关-增删改查" aria-hidden="true">#</a> 数据相关(增删改查)</h2><h3 id="新增数据" tabindex="-1"><a class="header-anchor" href="#新增数据" aria-hidden="true">#</a> 新增数据</h3><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>insert [IGNORE] into 表名 [字段1,字段2,......] values (值1,值2,......); # 单条记录
insert [IGNORE] into 表名 [字段1,字段2,......] values (值1,值2,......), (值1,值2,......); # 多条记录
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>IGNORE关键字只会插入数据库不存在的记录。比如主键冲突、唯一性冲突，数据库会报错，加上IGNORE之后数据库会忽略这条数据不会报错。</p><h3 id="更新数据" tabindex="-1"><a class="header-anchor" href="#更新数据" aria-hidden="true">#</a> 更新数据</h3><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>UPDATE [IGNORE] 表名 SET 字段1=值1, 字段2=值2, ......
[WHERE 条件1 ......]
[ORDER BY ......]
[LIMIT ......];
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，如果这里有limit关键字，那么后面只能跟一个参数，即表示取前多少条数据，这里的limit不能有2个参数，ignore表示更新失败就直接忽略而不是报错。</p><ul><li>把每个员工的编号和他上司的编号+1，用order by子句完成</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>UPDATE t_emp SET empno=empno+1, mgr=mgr+1
ORDER BY empno DESC;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>把月收入前三名的员工底薪减100元，用LIMIT子句完成</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>UPDATE t_emp
SET sal=sal-100
ORDER BY sal+IFNULL(comm,0) DESC
LIMIT 3;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>把10部门中，工龄达到20年的员工，底薪增加200元</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>UPDATE t_emp
SET sal=sal+200
WHERE deptno=10 AND DATEDIFF(NOW(),hiredate)/365 &gt;= 20
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="删除数据" tabindex="-1"><a class="header-anchor" href="#删除数据" aria-hidden="true">#</a> 删除数据</h3><p>子句执行顺序：FROM -&gt; WHERE -&gt; ORDER BY -&gt; LIMIT -&gt; DELETE</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>DELETE [IGNORE] FROM 表名
[WHERE 条件1, 条件2, ...]
[ORDER BY ...]
[LIMIT ...];
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ignore表示删除失败就直接忽略而不是报错。</p><h4 id="快速删除数据表全部记录" tabindex="-1"><a class="header-anchor" href="#快速删除数据表全部记录" aria-hidden="true">#</a> 快速删除数据表全部记录</h4><p>DELETE语句是在事务机制下删除记录，删除记录之前，先把要删除的记录保存到日志文件里，然后再删除记录。</p><p>TRUNCATE语句在事务机制之外删除记录，速度远超过DELETE语句。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>TRUNCATE TABLE 表名;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">注意</p><ol><li>drop（drop table 表名）是完全删除表，包括表结构，数据库就查不到这个表了</li><li>delete（delete from 表名）是删除表数据，保留表的结构，数据库中该表还存在，如果加where条件，可以只删除一行或者多行，下次插入id不会从1开始，而是从最后一次插入的id+1开始</li><li>truncate （truncate table 表名）只能删除全表数据，会保留表结构，数据库中该表还存在，下次插入id从1开始</li></ol></div><h3 id="查询数据" tabindex="-1"><a class="header-anchor" href="#查询数据" aria-hidden="true">#</a> 查询数据</h3><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>select [字段别名]/* 
from 数据源 
[where 条件子句] 
[group by 子句] 
[having 子句] 
[orderby 子句] 
[limit 子句];
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="select语句中各关键字的先后顺序" tabindex="-1"><a class="header-anchor" href="#select语句中各关键字的先后顺序" aria-hidden="true">#</a> <strong>select语句中各关键字的先后顺序</strong></h4><ul><li>(1) from</li><li>(2) on</li><li>(3) join</li><li>(4) where （可以使用表的别名）</li><li>(5) group by(可以开始使用select中字段的别名（不是表的别名），后面的语句中都可以使用)</li><li>(6) having + 聚合函数</li><li>(7) select</li><li>(8) distinct</li><li>(9) order by</li><li>(10) limit</li></ul><p>1~3是table部分——形成表</p><p>4~6是filter部分——过滤条件</p><p>7~10是show部分——展示</p><h4 id="去重查询" tabindex="-1"><a class="header-anchor" href="#去重查询" aria-hidden="true">#</a> 去重查询</h4><p>DISTINCT：对行去重</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT DISTINCT 字段 FROM 表名;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="字段别名" tabindex="-1"><a class="header-anchor" href="#字段别名" aria-hidden="true">#</a> 字段别名</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>select 字段名 [as 别名] from 表名;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="子查询" tabindex="-1"><a class="header-anchor" href="#子查询" aria-hidden="true">#</a> 子查询</h4><p>子查询: 数据的来源是一条查询语句(查询语句的结果是二维表)</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>Select * from (select 语句) [as 表名]; # 推荐from子查询
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="where子句" tabindex="-1"><a class="header-anchor" href="#where子句" aria-hidden="true">#</a> Where子句</h4><p>用来判断数据，筛选数据。</p><p>Where子句返回结果：0或者1，0代表false，1代表true。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT ... FROM ... WHERE 条件 [AND | OR] 条件 ......;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>判断条件：</p><ul><li><p>比较运算符： &gt;，&lt;，&gt;=，&lt;= ，!=，&lt;&gt;，=，like，between ... and ...，in/not in</p></li><li><p>逻辑运算符: &amp;&amp;(and)，||(or)，!(not)</p></li></ul><p>LIKE运算符通常使用如下通配符：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>“%”：匹配0个或多个字符。
“_”：只能匹配一个字符。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="group-by子句" tabindex="-1"><a class="header-anchor" href="#group-by子句" aria-hidden="true">#</a> Group by子句</h4><p>主要用来分组查询, 通过一定的规则将一个数据集划分为若干个小的区域，然后针对每个小区域分别进行数据汇总处理。也就是根据某个字段进行分组(相同的放一组,不同的分到不同的组)</p><ul><li>根据不同的部门号分组显示平均工资</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT deptno, ROUND(AVG(sal)) FROM t_emp GROUP BY deptno;/*round四舍五入为整数*/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>SELECT子句中可以包含聚合函数或者GROUP BY子句的分组列</strong>，<strong>其余列出现在SELECT子句中时就涉及到了SQL经典问题。</strong></p><p>在MySQL中，如果在SELECT列表中包含GROUP BY子句中未指定的列，MySQL 的默认行为不会报错，但结果可能不确定，MySQL将使用默认值FIRST()来选择这些列的值。也就是说，刚刚的例子假如是GROUP BY deptno，没有job，虽然语法不报错，但是这个job列的值实际上是从符合GROUP BY条件的行中任意选择的，也就是说，deptno为10，查出来的job可能是CLERK、MANAGER、PRESIDENT中任何一个，MySQL会默认选择job列在分组集合中的第一个值作为代表值。</p><div class="custom-container tip"><p class="custom-container-title">建议</p><p>在SELECT列表中仅包括GROUP BY子句中指定的列或聚合函数。</p></div><h4 id="having子句" tabindex="-1"><a class="header-anchor" href="#having子句" aria-hidden="true">#</a> Having子句</h4><p>Having子句与where子句一样是进行条件判断的。</p><p><strong>WHERE子句不允许出现聚合函数，HAVING子句的出现主要是为了WHERE子句不能使用聚合函数的问题</strong></p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT deptno FROM t_emp
WHERE hiredate&gt;=&quot;1982-01-01&quot;
GROUP BY deptno HAVING COUNT(*) &gt; 2
ORDER BY deptno;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">注意</p><p>HAVING子句判断只能和具体数值判断大小，不能和字段以及聚合函数判断，比较要有数值。比如查询工资大于平均工资的人的数量就不能写HAVING sal &gt; AVG(sal)，子句判断不是和数值在比较，直接报错。表连接能解决这个问题。</p></div><p><strong>HAVING的出现是不是可以完全替换WHERE？</strong></p><p>那肯定是不行的，Where是针对磁盘数据进行判断，进入到内存之后会进行分组操作，分组结果就需要having来处理.。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT deptno, COUNT(*) FROM t_emp
GROUP BY 1
HAVING deptno IN(10, 30);/*效率低了*/
 
SELECT deptno, COUNT(*) FROM t_emp 
WHERE deptno IN(10, 30)
GROUP BY 1;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从功能上来说，上面两种写法没有什么区别，但是WHERE优先级在GROUP BY之前，是先把数据按条件筛选完了再分组好呢，还是分完组再去筛选好呢？肯定是前者。所以WHERE能完成的就用WHERE完成，不要放到HAVING中。大量的数据从磁盘读取到内容代价比较大，先筛选完了，再把符合条件的记录读取到内存中显然更好。</p><ul><li><p>分组统计的结果或者说统计函数都只有having能够使用。</p></li><li><p>Having能够使用字段别名，where不能，where是从磁盘取数据，而名字只可能是字段名，<strong>别名是在字段进入到内存后才会产生。</strong></p></li></ul><h4 id="order-by子句" tabindex="-1"><a class="header-anchor" href="#order-by子句" aria-hidden="true">#</a> Order by子句</h4><p>根据某个字段进行升序或者降序排序，依赖校对集。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>Order by 字段名 [asc|desc]; -- asc是升序(默认的),desc是降序
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="limit子句" tabindex="-1"><a class="header-anchor" href="#limit子句" aria-hidden="true">#</a> Limit子句</h4><ul><li><p>方式一：只用来限制长度(数据量)：limit 数据量;</p></li><li><p>方式二：限制起始位置，限制数量：limit 起始位置,长度;</p></li></ul><h4 id="内连接" tabindex="-1"><a class="header-anchor" href="#内连接" aria-hidden="true">#</a> 内连接</h4><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT ...
FROM table1
[INNER] JOIN table2 ON table1.column = table2.column
[WHERE] ...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="外连接" tabindex="-1"><a class="header-anchor" href="#外连接" aria-hidden="true">#</a> 外连接</h4><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT ...
FROM table1
LEFT JOIN table2 ON table1.column = table2.column
[WHERE] ...
 
# 或者

SELECT ...
FROM table1
RIGHT JOIN table2 ON table1.column = table2.column
[WHERE] ...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="视图相关" tabindex="-1"><a class="header-anchor" href="#视图相关" aria-hidden="true">#</a> 视图相关</h2><h3 id="创建视图" tabindex="-1"><a class="header-anchor" href="#创建视图" aria-hidden="true">#</a> 创建视图</h3><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>create view 视图名字 as select语句;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="查看视图" tabindex="-1"><a class="header-anchor" href="#查看视图" aria-hidden="true">#</a> 查看视图</h3><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>show tables [like]/desc 视图名字;
# or
show create table 视图名;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="修改视图" tabindex="-1"><a class="header-anchor" href="#修改视图" aria-hidden="true">#</a> 修改视图</h3><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>alter view 视图名字 as 新的select语句;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="删除视图" tabindex="-1"><a class="header-anchor" href="#删除视图" aria-hidden="true">#</a> 删除视图</h3><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>drop view 视图名字;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,274),n=[l];function r(u,c){return a(),i("div",null,n)}const v=e(d,[["render",r],["__file","1-MySQL常用的命令.html.vue"]]);export{v as default};
