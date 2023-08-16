import{_ as i,r as t,o as l,c as o,a,d as n,b as e,e as r}from"./app-66d6b4fd.js";const c={},p=a("h1",{id:"rocketmq部署指南",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#rocketmq部署指南","aria-hidden":"true"},"#"),n(" RocketMQ部署指南")],-1),d=a("h2",{id:"_1-docker单机部署",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#_1-docker单机部署","aria-hidden":"true"},"#"),n(" 1.Docker单机部署")],-1),m={href:"https://hub.docker.com/r/apache/rocketmq/tags",target:"_blank",rel:"noopener noreferrer"},v=r(`<h3 id="_1-1拉取镜像" tabindex="-1"><a class="header-anchor" href="#_1-1拉取镜像" aria-hidden="true">#</a> 1.1拉取镜像</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 最新版本</span>
<span class="token function">docker</span> pull apache/rocketmq:5.1.1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>查看镜像信息</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> images
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_1-2部署nameserver" tabindex="-1"><a class="header-anchor" href="#_1-2部署nameserver" aria-hidden="true">#</a> 1.2部署NameServer</h3>`,5),u={href:"https://so.csdn.net/so/search?q=Topic&spm=1001.2101.3001.7020",target:"_blank",rel:"noopener noreferrer"},k=r(`<h4 id="创建挂载文件夹" tabindex="-1"><a class="header-anchor" href="#创建挂载文件夹" aria-hidden="true">#</a> 创建挂载文件夹</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 日志目录</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /tmp/rocketmq/nameserver/logs
<span class="token comment"># 脚本目录</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /tmp/rocketmq/nameserver/bin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="设置权限" tabindex="-1"><a class="header-anchor" href="#设置权限" aria-hidden="true">#</a> 设置权限</h4><p>如果不设置会导致NameServer容器内部无法写日志文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 777 文件所属者、文件所属组和其他人有 [读取 &amp; 写入 &amp; 执行]全部权限。rwxrwxrwx</span>
<span class="token function">chmod</span> <span class="token number">777</span> <span class="token parameter variable">-R</span> /tmp/rocketmq/nameserver/*
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="修改启动脚本" tabindex="-1"><a class="header-anchor" href="#修改启动脚本" aria-hidden="true">#</a> 修改启动脚本</h4><p>NameServer启动脚本中有一个自动计算最大堆内存和新生代内存的函数会导致在不同硬件环境下设置最大堆内存和新生代内存环境变量不被应用，这里先提前copy一份容器内部启动脚本做挂载，如果想自定义内存可以自己调整。（如果不需要自定义堆内存可以跳过）</p><ol><li>启动容器</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">--privileged</span><span class="token operator">=</span>true <span class="token punctuation">\\</span>
<span class="token parameter variable">--name</span> rmqnamesrv <span class="token punctuation">\\</span>
apache/rocketmq:5.1.1 <span class="token function">sh</span> mqnamesrv
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>复制容器内启动脚本到挂载目录 /tmp/rocketmq/nameserver/bin</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> <span class="token function">cp</span> rmqnamesrv:/home/rocketmq/rocketmq-5.1.1/bin/runserver.sh /tmp/rocketmq/nameserver/bin/runserver.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="3"><li>修改runserver.sh，找到调用 <code>calculate_heap_sizes</code> 函数的位置注释掉保存即可</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 打开脚本文件</span>
<span class="token function">vi</span> /tmp/rocketmq/nameserver/bin/runserver.sh 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>停止&amp;删除容器</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> stop rmqnamesrv
<span class="token function">docker</span> <span class="token function">rm</span> rmqnamesrv
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="启动nameserver" tabindex="-1"><a class="header-anchor" href="#启动nameserver" aria-hidden="true">#</a> 启动NameServer</h4><ul><li>不需要自定义堆内存</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">--privileged</span><span class="token operator">=</span>true <span class="token punctuation">\\</span>
<span class="token parameter variable">--name</span> rmqnamesrv <span class="token punctuation">\\</span>
<span class="token parameter variable">-p</span> <span class="token number">9876</span>:9876  <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /tmp/rocketmq/nameserver/logs:/home/rocketmq/logs <span class="token punctuation">\\</span>
apache/rocketmq:5.1.1 <span class="token function">sh</span> mqnamesrv
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>需要自定义堆内存</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">--privileged</span><span class="token operator">=</span>true <span class="token punctuation">\\</span>
<span class="token parameter variable">--name</span> rmqnamesrv <span class="token punctuation">\\</span>
<span class="token parameter variable">-p</span> <span class="token number">9876</span>:9876  <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /tmp/rocketmq/nameserver/logs:/home/rocketmq/logs <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /tmp/rocketmq/nameserver/bin/runserver.sh:/home/rocketmq/rocketmq-5.1.1/bin/runserver.sh <span class="token punctuation">\\</span>
<span class="token parameter variable">-e</span> <span class="token string">&quot;MAX_HEAP_SIZE=256M&quot;</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-e</span> <span class="token string">&quot;HEAP_NEWSIZE=128M&quot;</span> <span class="token punctuation">\\</span>
apache/rocketmq:5.1.1 <span class="token function">sh</span> mqnamesrv
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>参数说明</strong>：</p><table><thead><tr><th><strong>参数</strong></th><th><strong>说明</strong></th></tr></thead><tbody><tr><td>-d</td><td>以守护进程的方式启动</td></tr><tr><td>--privileged=true</td><td>docker容器 获取宿主机root权限（特殊权限）</td></tr><tr><td>--restart=always</td><td>docker重启时候容器自动重启</td></tr><tr><td>--name rmqnamesrv</td><td>容器名</td></tr><tr><td>-p 9876:9876</td><td>把容器内的端口9876挂载到宿主机9876上面，宿主机端口:容器内部端口</td></tr><tr><td>-v /tmp/rocketmq/nameserver/logs:/home/rocketmq/logs</td><td>挂载容器内日志</td></tr><tr><td>-v /tmp/rocketmq/nameserver/bin/runserver.sh:/home/rocketmq/rocketmq-latest/bin/runserver.sh</td><td>挂载启动脚本（需要自己定义堆内存时使用）</td></tr><tr><td>-e “MAX_HEAP_SIZE=256M”</td><td>设置最大堆内存和堆内存初始大小</td></tr><tr><td>-e “HEAP_NEWSIZE=128M”</td><td>设置新生代内存大小</td></tr><tr><td>apache/rocketmq:5.1.1</td><td>使用的镜像名称+版本</td></tr><tr><td>使用的镜像名称+版本</td><td>启动namesrv服务</td></tr></tbody></table><h3 id="_1-3部署broker" tabindex="-1"><a class="header-anchor" href="#_1-3部署broker" aria-hidden="true">#</a> 1.3部署Broker</h3><h4 id="创建需要映射的文件夹和文件" tabindex="-1"><a class="header-anchor" href="#创建需要映射的文件夹和文件" aria-hidden="true">#</a> 创建需要映射的文件夹和文件</h4><p>提前创建挂载目录用于挂载容器内部数据、配置文件、以及日志</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建需要的挂载目录</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /tmp/rocketmq/broker/logs <span class="token punctuation">\\</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /tmp/rocketmq/broker/data <span class="token punctuation">\\</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /tmp/rocketmq/broker/conf <span class="token punctuation">\\</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /tmp/rocketmq/broker/bin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="设置权限-1" tabindex="-1"><a class="header-anchor" href="#设置权限-1" aria-hidden="true">#</a> 设置权限</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 777 文件所属者、文件所属组和其他人有 [读取 &amp; 写入 &amp; 执行]全部权限。rwxrwxrwx</span>
<span class="token function">chmod</span> <span class="token number">777</span> <span class="token parameter variable">-R</span> /tmp/rocketmq/broker/*
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="创建broker-conf文件" tabindex="-1"><a class="header-anchor" href="#创建broker-conf文件" aria-hidden="true">#</a> 创建broker.conf文件</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vi</span> /tmp/rocketmq/broker/conf/broker.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>添加以下配置信息到broker.conf，这里不对参数做过多的说明，在下面Broker配置详解中有对Broker常用参数做详细介绍</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># nameServer 地址多个用;隔开 默认值null</span>
<span class="token comment"># 例：127.0.0.1:6666;127.0.0.1:8888 </span>
namesrvAddr <span class="token operator">=</span> <span class="token number">192.168</span>.100.100:9876
<span class="token comment"># 集群名称</span>
brokerClusterName <span class="token operator">=</span> DefaultCluster
<span class="token comment"># 节点名称</span>
brokerName <span class="token operator">=</span> broker-a
<span class="token comment"># broker id节点ID， 0 表示 master, 其他的正整数表示 slave，不能小于0 </span>
brokerId <span class="token operator">=</span> <span class="token number">0</span>
<span class="token comment"># Broker服务地址 String	内部使用填内网ip，如果是需要给外部使用填公网ip</span>
brokerIP1 <span class="token operator">=</span> <span class="token number">192.168</span>.100.100
<span class="token comment"># Broker角色</span>
brokerRole <span class="token operator">=</span> ASYNC_MASTER
<span class="token comment"># 刷盘方式</span>
flushDiskType <span class="token operator">=</span> ASYNC_FLUSH
<span class="token comment"># 在每天的什么时间删除已经超过文件保留时间的 commit log，默认值04</span>
deleteWhen <span class="token operator">=</span> 04
<span class="token comment"># 以小时计算的文件保留时间 默认值72小时</span>
fileReservedTime <span class="token operator">=</span> <span class="token number">72</span>
<span class="token comment"># 是否允许Broker 自动创建Topic，建议线下开启，线上关闭</span>
<span class="token assign-left variable">autoCreateTopicEnable</span><span class="token operator">=</span>true
<span class="token comment"># 是否允许Broker自动创建订阅组，建议线下开启，线上关闭</span>
<span class="token assign-left variable">autoCreateSubscriptionGroup</span><span class="token operator">=</span>true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>说明：建立broker.conf文件，通过这个文件把RocketMQ的broker管理起来</p><h4 id="修改broker启动脚本" tabindex="-1"><a class="header-anchor" href="#修改broker启动脚本" aria-hidden="true">#</a> 修改Broker启动脚本</h4><p>Broker启动脚本中有一个自动计算最大堆内存和新生代内存的函数会导致在不同硬件环境下设置最大堆内存和新生代内存环境变量不被应用，这里先提前copy一份容器内部启动脚本做挂载，如果想自定义内存可以自己调整。（如果不需要自定义堆内存可以跳过）</p><ol><li>启动容器</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">--name</span> rmqbroker <span class="token punctuation">\\</span>
<span class="token parameter variable">--privileged</span><span class="token operator">=</span>true <span class="token punctuation">\\</span>
apache/rocketmq:5.1.1 <span class="token punctuation">\\</span>
<span class="token function">sh</span> mqbroker
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>复制容器内启动脚本到挂载目录/tmp/rocketmq/nameserver/bin</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docker cp rmqbroker:/home/rocketmq/rocketmq-5.1.1/bin/runbroker.sh /tmp/rocketmq/broker/bin/runbroker.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="3"><li>修改runbroker.sh，找到调用calculate_heap_sizes函数的位置注释掉保存即可</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 打开脚本文件</span>
<span class="token function">vi</span> /usr/local/rocketmq/broker/bin/runbroker.sh 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>停止&amp;删除容器</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> stop rmqbroker
<span class="token function">docker</span> <span class="token function">rm</span> rmqbroker
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="启动broker-proxy" tabindex="-1"><a class="header-anchor" href="#启动broker-proxy" aria-hidden="true">#</a> 启动Broker+Proxy</h4><ul><li>不需要自定义堆内存</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">--name</span> rmqbroker <span class="token punctuation">\\</span>
<span class="token parameter variable">-p</span> <span class="token number">10911</span>:10911 <span class="token parameter variable">-p</span> <span class="token number">10909</span>:10909 <span class="token punctuation">\\</span>
<span class="token parameter variable">--privileged</span><span class="token operator">=</span>true <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /tmp/rocketmq/broker/logs:/root/logs <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /tmp/rocketmq/broker/store:/root/store <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /tmp/rocketmq/broker/conf/broker.conf:/home/rocketmq/broker.conf <span class="token punctuation">\\</span>
apache/rocketmq:5.1.1 <span class="token punctuation">\\</span>
<span class="token function">sh</span> mqbroker <span class="token parameter variable">-c</span> /home/rocketmq/broker.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>需要自定义堆内存</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">--name</span> rmqbroker <span class="token punctuation">\\</span>
<span class="token parameter variable">-p</span> <span class="token number">10911</span>:10911 <span class="token parameter variable">-p</span> <span class="token number">10909</span>:10909 <span class="token punctuation">\\</span>
<span class="token parameter variable">--privileged</span><span class="token operator">=</span>true <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /tmp/rocketmq/broker/logs:/root/logs <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /tmp/rocketmq/broker/store:/root/store <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /tmp/rocketmq/broker/conf/broker.conf:/home/rocketmq/broker.conf <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /tmp/rocketmq/broker/bin/runbroker.sh:/home/rocketmq/rocketmq-5.1.1/bin/runbroker.sh <span class="token punctuation">\\</span>
<span class="token parameter variable">-e</span> <span class="token string">&quot;MAX_HEAP_SIZE=512M&quot;</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-e</span> <span class="token string">&quot;HEAP_NEWSIZE=256M&quot;</span> <span class="token punctuation">\\</span>
apache/rocketmq:5.1.1 <span class="token punctuation">\\</span>
<span class="token function">sh</span> mqbroker <span class="token parameter variable">-c</span> /home/rocketmq/broker.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>参数说明</strong>：</p><table><thead><tr><th>参数</th><th><strong>说明</strong></th></tr></thead><tbody><tr><td>-v /tmp/rocketmq/broker/bin/runbroker.sh:/home/rocketmq/rocketmq-5.1.1/bin/runbroker.sh \\</td><td>挂载broker启动脚本（需要自己定义堆内存时使用）</td></tr><tr><td>sh mqbroker -c /home/rocketmq/broker.conf</td><td>启动broker服务，使用自定义配置文件</td></tr></tbody></table><h3 id="_1-4部署proxy" tabindex="-1"><a class="header-anchor" href="#_1-4部署proxy" aria-hidden="true">#</a> 1.4部署Proxy</h3><ul><li><p>在 Local 模式下，Broker 和 Proxy 是同进程部署，只是在原有 Broker 的配置基础上新增 Proxy 的简易配置就可以运行，使用 <code>--enable-proxy</code>。目前，加上 <code>--enable-proxy</code>，容器无法启动，原因暂不知道。</p></li><li><p>在 Cluster 模式下，Broker 和 Proxy 分别部署，即在原有的集群基础上，额外再部署 Proxy 即可，使用 <code>sh mqproxy</code>。</p></li></ul><h3 id="_1-5部署rocketmq控制台" tabindex="-1"><a class="header-anchor" href="#_1-5部署rocketmq控制台" aria-hidden="true">#</a> 1.5部署RocketMQ控制台</h3><h4 id="拉取镜像" tabindex="-1"><a class="header-anchor" href="#拉取镜像" aria-hidden="true">#</a> 拉取镜像</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> pull apacherocketmq/rocketmq-dashboard:latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="启动rocketmq控制台" tabindex="-1"><a class="header-anchor" href="#启动rocketmq控制台" aria-hidden="true">#</a> 启动RocketMQ控制台</h4>`,56),b={href:"http://192.168.100.100:8080",target:"_blank",rel:"noopener noreferrer"},h=r(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">--name</span> rmqdashboard <span class="token punctuation">\\</span>
<span class="token parameter variable">-e</span> <span class="token string">&quot;JAVA_OPTS=-Xmx256M -Xms256M -Xmn128M -Drocketmq.namesrv.addr=192.168.100.100:9876&quot;</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-p</span> <span class="token number">8080</span>:8080 <span class="token punctuation">\\</span>
apacherocketmq/rocketmq-dashboard
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-6broker配置详解" tabindex="-1"><a class="header-anchor" href="#_1-6broker配置详解" aria-hidden="true">#</a> 1.6Broker配置详解</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># nameServer 地址多个用;隔开 默认值null</span>
<span class="token comment"># 例：127.0.0.1:6666;127.0.0.1:8888 </span>
namesrvAddr <span class="token operator">=</span> <span class="token number">127.0</span>.0.1:6666
<span class="token comment"># 集群名称 单机配置可以随意填写，如果是集群部署在同一个集群中集群名称必须一致类似Nacos的命名空间</span>
brokerClusterName <span class="token operator">=</span> DefaultCluster
<span class="token comment"># broker节点名称 单机配置可以随意填写，如果是集群部署在同一个集群中节点名称不要重复</span>
brokerName <span class="token operator">=</span> broker-a
<span class="token comment"># broker id节点ID， 0 表示 master, 其他的正整数表示 slave，不能小于0 </span>
brokerId <span class="token operator">=</span> <span class="token number">0</span>
<span class="token comment"># Broker 对外服务的监听端口 默认值10911</span>
<span class="token comment"># 端口（注意：broker启动后，会占用3个端口，分别在listenPort基础上-2，+1，供内部程序使用，所以集群一定要规划好端口，避免冲突）</span>
<span class="token assign-left variable">listenPort</span><span class="token operator">=</span><span class="token number">10911</span>
<span class="token comment"># Broker服务地址	String	内部使用填内网ip，如果是需要给外部使用填公网ip</span>
brokerIP1 <span class="token operator">=</span> <span class="token number">127.0</span>.0.1
<span class="token comment"># BrokerHAIP地址，供slave同步消息的地址 内部使用填内网ip，如果是需要给外部使用填公网ip</span>
brokerIP2 <span class="token operator">=</span> <span class="token number">127.0</span>.0.1

<span class="token comment"># Broker角色 默认值ASYNC_MASTER</span>
<span class="token comment"># ASYNC_MASTER 异步复制Master，只要主写成功就会响应客户端成功，如果主宕机可能会出现小部分数据丢失</span>
<span class="token comment"># SYNC_MASTER 同步双写Master，主和从节点都要写成功才会响应客户端成功，主宕机也不会出现数据丢失</span>
<span class="token comment"># SLAVE</span>
brokerRole <span class="token operator">=</span> ASYNC_MASTER
<span class="token comment"># 刷盘方式</span>
<span class="token comment"># SYNC_FLUSH（同步刷新）相比于ASYNC_FLUSH（异步处理）会损失很多性能，但是也更可靠，所以需要根据实际的业务场景做好权衡，默认值ASYNC_FLUSH</span>
flushDiskType <span class="token operator">=</span> ASYNC_FLUSH
<span class="token comment"># 在每天的什么时间删除已经超过文件保留时间的 commit log，默认值04</span>
deleteWhen <span class="token operator">=</span> 04
<span class="token comment"># 以小时计算的文件保留时间 默认值72小时</span>
fileReservedTime <span class="token operator">=</span> <span class="token number">72</span>

<span class="token comment"># 消息大小 单位字节 默认1024 * 1024 * 4</span>
<span class="token assign-left variable">maxMessageSize</span><span class="token operator">=</span><span class="token number">4194304</span>

<span class="token comment"># 在发送消息时，自动创建服务器不存在的Topic，默认创建的队列数，默认值4</span>
<span class="token assign-left variable">defaultTopicQueueNums</span><span class="token operator">=</span><span class="token number">4</span>
<span class="token comment"># 是否允许Broker 自动创建Topic，建议线下开启，线上关闭</span>
<span class="token assign-left variable">autoCreateTopicEnable</span><span class="token operator">=</span>true
<span class="token comment"># 是否允许Broker自动创建订阅组，建议线下开启，线上关闭</span>
<span class="token assign-left variable">autoCreateSubscriptionGroup</span><span class="token operator">=</span>true

<span class="token comment"># 失败重试时间，默认重试16次进入死信队列，第一次1s第二次5s以此类推。</span>
<span class="token comment"># 延时队列时间等级默认18个，可以设置多个比如在后面添加一个1d(一天)，使用的时候直接用对应时间等级即可,从1开始到18，如果添加了第19个直接使用等级19即可</span>
<span class="token assign-left variable">messageDelayLevel</span><span class="token operator">=</span>1s 5s 10s 30s 1m 2m 3m 4m 5m 6m 7m 8m 9m 10m 20m 30m 1h 2h

<span class="token comment"># 指定TM在20秒内应将最终确认状态发送给TC，否则引发消息回查。默认为60秒</span>
<span class="token assign-left variable">transactionTimeout</span><span class="token operator">=</span><span class="token number">20</span>
<span class="token comment"># 指定最多回查5次，超过后将丢弃消息并记录错误日志。默认15次。</span>
<span class="token assign-left variable">transactionCheckMax</span><span class="token operator">=</span><span class="token number">5</span>
<span class="token comment"># 指定设置的多次消息回查的时间间隔为10秒。默认为60秒。</span>
<span class="token assign-left variable">transactionCheckInterval</span><span class="token operator">=</span><span class="token number">10</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-docker多节点单副本部署" tabindex="-1"><a class="header-anchor" href="#_2-docker多节点单副本部署" aria-hidden="true">#</a> 2.Docker多节点单副本部署</h2><h3 id="_2-1启动nameserver" tabindex="-1"><a class="header-anchor" href="#_2-1启动nameserver" aria-hidden="true">#</a> 2.1启动NameServer</h3><p>创建挂载文件夹 与 设置权限 同Docker单机部署。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">--privileged</span><span class="token operator">=</span>true <span class="token punctuation">\\</span>
<span class="token parameter variable">--name</span> rmqnamesrv <span class="token punctuation">\\</span>
<span class="token parameter variable">-p</span> <span class="token number">9876</span>:9876  <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /tmp/rocketmq/nameserver/logs:/home/rocketmq/logs <span class="token punctuation">\\</span>
apache/rocketmq:5.1.1 <span class="token function">sh</span> mqnamesrv
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2启动broker-proxy" tabindex="-1"><a class="header-anchor" href="#_2-2启动broker-proxy" aria-hidden="true">#</a> 2.2启动Broker+Proxy</h3><h4 id="挂载目录" tabindex="-1"><a class="header-anchor" href="#挂载目录" aria-hidden="true">#</a> 挂载目录</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建需要的挂载目录1</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /tmp/rocketmq/broker1/logs <span class="token punctuation">\\</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /tmp/rocketmq/broker1/data <span class="token punctuation">\\</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /tmp/rocketmq/broker1/conf <span class="token punctuation">\\</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /tmp/rocketmq/broker1/bin

<span class="token comment"># 创建需要的挂载目录2</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /tmp/rocketmq/broker2/logs <span class="token punctuation">\\</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /tmp/rocketmq/broker2/data <span class="token punctuation">\\</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /tmp/rocketmq/broker2/conf <span class="token punctuation">\\</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /tmp/rocketmq/broker2/bin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="设置权限-2" tabindex="-1"><a class="header-anchor" href="#设置权限-2" aria-hidden="true">#</a> 设置权限</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 777 文件所属者、文件所属组和其他人有 [读取 &amp; 写入 &amp; 执行]全部权限。rwxrwxrwx</span>
<span class="token function">chmod</span> <span class="token number">777</span> <span class="token parameter variable">-R</span> /tmp/rocketmq/broker1/*
<span class="token function">chmod</span> <span class="token number">777</span> <span class="token parameter variable">-R</span> /tmp/rocketmq/broker2/*
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="创建broker-conf文件-1" tabindex="-1"><a class="header-anchor" href="#创建broker-conf文件-1" aria-hidden="true">#</a> 创建broker.conf文件</h4><p>broker1：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vi</span> /tmp/rocketmq/broker1/conf/broker.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># nameServer 地址多个用;隔开 默认值null</span>
<span class="token comment"># 例：127.0.0.1:6666;127.0.0.1:8888 </span>
namesrvAddr <span class="token operator">=</span> <span class="token number">192.168</span>.100.100:9876
<span class="token comment"># 集群名称</span>
brokerClusterName <span class="token operator">=</span> DefaultCluster
<span class="token comment"># 节点名称</span>
brokerName <span class="token operator">=</span> broker-a
<span class="token comment"># broker id节点ID， 0 表示 master, 其他的正整数表示 slave，不能小于0 </span>
brokerId <span class="token operator">=</span> <span class="token number">0</span>
<span class="token comment"># Broker服务地址 String	内部使用填内网ip，如果是需要给外部使用填公网ip</span>
brokerIP1 <span class="token operator">=</span> <span class="token number">192.168</span>.100.100
<span class="token comment">#broker的服务端口，默认10911</span>
<span class="token assign-left variable">listenPort</span><span class="token operator">=</span><span class="token number">10911</span>
<span class="token comment"># Broker角色</span>
brokerRole <span class="token operator">=</span> ASYNC_MASTER
<span class="token comment"># 刷盘方式</span>
flushDiskType <span class="token operator">=</span> ASYNC_FLUSH
<span class="token comment"># 在每天的什么时间删除已经超过文件保留时间的 commit log，默认值04</span>
deleteWhen <span class="token operator">=</span> 04
<span class="token comment"># 以小时计算的文件保留时间 默认值72小时</span>
fileReservedTime <span class="token operator">=</span> <span class="token number">72</span>
<span class="token comment"># 是否允许Broker 自动创建Topic，建议线下开启，线上关闭</span>
<span class="token assign-left variable">autoCreateTopicEnable</span><span class="token operator">=</span>true
<span class="token comment"># 是否允许Broker自动创建订阅组，建议线下开启，线上关闭</span>
<span class="token assign-left variable">autoCreateSubscriptionGroup</span><span class="token operator">=</span>true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>broker2：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>vi /tmp/rocketmq/broker2/conf/broker.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># nameServer 地址多个用;隔开 默认值null</span>
<span class="token comment"># 例：127.0.0.1:6666;127.0.0.1:8888 </span>
namesrvAddr <span class="token operator">=</span> <span class="token number">192.168</span>.100.100:9876
<span class="token comment"># 集群名称</span>
brokerClusterName <span class="token operator">=</span> DefaultCluster
<span class="token comment"># 节点名称</span>
brokerName <span class="token operator">=</span> broker-b
<span class="token comment"># broker id节点ID， 0 表示 master, 其他的正整数表示 slave，不能小于0 </span>
brokerId <span class="token operator">=</span> <span class="token number">0</span>
<span class="token comment"># Broker服务地址 String	内部使用填内网ip，如果是需要给外部使用填公网ip</span>
brokerIP1 <span class="token operator">=</span> <span class="token number">192.168</span>.100.100
<span class="token comment">#broker的服务端口，和节点a区分开</span>
<span class="token assign-left variable">listenPort</span><span class="token operator">=</span><span class="token number">11911</span>
<span class="token comment"># Broker角色</span>
brokerRole <span class="token operator">=</span> ASYNC_MASTER
<span class="token comment"># 刷盘方式</span>
flushDiskType <span class="token operator">=</span> ASYNC_FLUSH
<span class="token comment"># 在每天的什么时间删除已经超过文件保留时间的 commit log，默认值04</span>
deleteWhen <span class="token operator">=</span> 04
<span class="token comment"># 以小时计算的文件保留时间 默认值72小时</span>
fileReservedTime <span class="token operator">=</span> <span class="token number">72</span>
<span class="token comment"># 是否允许Broker 自动创建Topic，建议线下开启，线上关闭</span>
<span class="token assign-left variable">autoCreateTopicEnable</span><span class="token operator">=</span>true
<span class="token comment"># 是否允许Broker自动创建订阅组，建议线下开启，线上关闭</span>
<span class="token assign-left variable">autoCreateSubscriptionGroup</span><span class="token operator">=</span>true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="brocker监听端口" tabindex="-1"><a class="header-anchor" href="#brocker监听端口" aria-hidden="true">#</a> Brocker监听端口</h4><ul><li>listenPort：默认10911，接受客户端连接的监听端口，作为对producer和consumer使用服务的端口号，可以通过配置文件改</li><li>haListenPort：默认为listenPort + 1，高可用服务监听端口，主要用于slave同master同步</li><li>fastListenPort：默认为listenPort -2， 主要是fastRemotingServer服务使用，用于VIP通道</li></ul><h4 id="启动brocker1-proxy" tabindex="-1"><a class="header-anchor" href="#启动brocker1-proxy" aria-hidden="true">#</a> 启动brocker1 + Proxy：</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">--name</span> rmqbroker1 <span class="token punctuation">\\</span>
<span class="token parameter variable">-p</span> <span class="token number">10911</span>:10911 <span class="token parameter variable">-p</span> <span class="token number">10909</span>:10909 <span class="token parameter variable">-p</span> <span class="token number">10912</span>:10912 <span class="token punctuation">\\</span>
<span class="token parameter variable">--privileged</span><span class="token operator">=</span>true <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /tmp/rocketmq/broker1/logs:/root/logs <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /tmp/rocketmq/broker1/store:/root/store <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /tmp/rocketmq/broker1/conf/broker.conf:/home/rocketmq/broker.conf <span class="token punctuation">\\</span>
apache/rocketmq:5.1.1 <span class="token punctuation">\\</span>
<span class="token function">sh</span> mqbroker <span class="token parameter variable">-c</span> /home/rocketmq/broker.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="启动brocker2-proxy" tabindex="-1"><a class="header-anchor" href="#启动brocker2-proxy" aria-hidden="true">#</a> 启动brocker2 + Proxy：</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">--name</span> rmqbroker2 <span class="token punctuation">\\</span>
<span class="token parameter variable">-p</span> <span class="token number">11911</span>:11911 <span class="token parameter variable">-p</span> <span class="token number">11909</span>:11909 <span class="token parameter variable">-p</span> <span class="token number">11912</span>:11912 <span class="token punctuation">\\</span>
<span class="token parameter variable">--privileged</span><span class="token operator">=</span>true <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /tmp/rocketmq/broker2/logs:/root/logs <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /tmp/rocketmq/broker2/store:/root/store <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /tmp/rocketmq/broker2/conf/broker.conf:/home/rocketmq/broker.conf <span class="token punctuation">\\</span>
apache/rocketmq:5.1.1 <span class="token punctuation">\\</span>
<span class="token function">sh</span> mqbroker <span class="token parameter variable">-c</span> /home/rocketmq/broker.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="rocketmq控制台" tabindex="-1"><a class="header-anchor" href="#rocketmq控制台" aria-hidden="true">#</a> RocketMQ控制台</h4>`,26),g={href:"http://192.168.100.100:8080",target:"_blank",rel:"noopener noreferrer"},f=r(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">--name</span> rmqdashboard <span class="token punctuation">\\</span>
<span class="token parameter variable">-e</span> <span class="token string">&quot;JAVA_OPTS=-Xmx256M -Xms256M -Xmn128M -Drocketmq.namesrv.addr=192.168.100.100:9876&quot;</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-p</span> <span class="token number">8080</span>:8080 <span class="token punctuation">\\</span>
apacherocketmq/rocketmq-dashboard
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-docker单主单从" tabindex="-1"><a class="header-anchor" href="#_3-docker单主单从" aria-hidden="true">#</a> 3.Docker单主单从</h2><p>在 2.Docker多节点单副本的基础上，添加 broker1-s ，关闭broker2。</p><h3 id="挂载目录-1" tabindex="-1"><a class="header-anchor" href="#挂载目录-1" aria-hidden="true">#</a> 挂载目录</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建需要的挂载目录1</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /tmp/rocketmq/broker1-s/logs <span class="token punctuation">\\</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /tmp/rocketmq/broker1-s/data <span class="token punctuation">\\</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /tmp/rocketmq/broker1-s/conf <span class="token punctuation">\\</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /tmp/rocketmq/broker1-s/bin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="创建broker-conf文件-2" tabindex="-1"><a class="header-anchor" href="#创建broker-conf文件-2" aria-hidden="true">#</a> 创建broker.conf文件</h3><p>brocker1的副本：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>vi /tmp/rocketmq/broker1-s/conf/broker-s.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># nameServer 地址多个用;隔开 默认值null</span>
<span class="token comment"># 例：127.0.0.1:6666;127.0.0.1:8888 </span>
namesrvAddr <span class="token operator">=</span> <span class="token number">192.168</span>.100.100:9876
<span class="token comment"># 集群名称</span>
brokerClusterName <span class="token operator">=</span> DefaultCluster
<span class="token comment"># 节点名称</span>
brokerName <span class="token operator">=</span> broker-a
<span class="token comment"># broker id节点ID， 0 表示 master, 其他的正整数表示 slave，不能小于0 </span>
brokerId <span class="token operator">=</span> <span class="token number">1</span>
<span class="token comment"># Broker服务地址 String	内部使用填内网ip，如果是需要给外部使用填公网ip</span>
brokerIP1 <span class="token operator">=</span> <span class="token number">192.168</span>.100.100
<span class="token comment">#broker的服务端口，默认10911</span>
<span class="token assign-left variable">listenPort</span><span class="token operator">=</span><span class="token number">12911</span>
<span class="token comment"># Broker角色</span>
brokerRole <span class="token operator">=</span> SLAVE
<span class="token comment"># 刷盘方式</span>
flushDiskType <span class="token operator">=</span> ASYNC_FLUSH
<span class="token comment"># 在每天的什么时间删除已经超过文件保留时间的 commit log，默认值04</span>
deleteWhen <span class="token operator">=</span> 04
<span class="token comment"># 以小时计算的文件保留时间 默认值72小时</span>
fileReservedTime <span class="token operator">=</span> <span class="token number">72</span>
<span class="token comment"># 是否允许Broker 自动创建Topic，建议线下开启，线上关闭</span>
<span class="token assign-left variable">autoCreateTopicEnable</span><span class="token operator">=</span>true
<span class="token comment"># 是否允许Broker自动创建订阅组，建议线下开启，线上关闭</span>
<span class="token assign-left variable">autoCreateSubscriptionGroup</span><span class="token operator">=</span>true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="设置权限-3" tabindex="-1"><a class="header-anchor" href="#设置权限-3" aria-hidden="true">#</a> 设置权限</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 777 文件所属者、文件所属组和其他人有 [读取 &amp; 写入 &amp; 执行]全部权限。rwxrwxrwx</span>
<span class="token function">chmod</span> <span class="token number">777</span> <span class="token parameter variable">-R</span> /tmp/rocketmq/broker1-s/*
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="启动brocker1-s-proxy" tabindex="-1"><a class="header-anchor" href="#启动brocker1-s-proxy" aria-hidden="true">#</a> 启动brocker1-s + Proxy：</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">--name</span> rmqbroker1-s <span class="token punctuation">\\</span>
<span class="token parameter variable">-p</span> <span class="token number">12911</span>:12911 <span class="token parameter variable">-p</span> <span class="token number">12909</span>:12909 <span class="token parameter variable">-p</span> <span class="token number">12912</span>:12912 <span class="token punctuation">\\</span>
<span class="token parameter variable">--privileged</span><span class="token operator">=</span>true <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /tmp/rocketmq/broker1-s/logs:/root/logs <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /tmp/rocketmq/broker1-s/store:/root/store <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /tmp/rocketmq/broker1-s/conf/broker-s.conf:/home/rocketmq/broker.conf <span class="token punctuation">\\</span>
apache/rocketmq:5.1.1 <span class="token punctuation">\\</span>
<span class="token function">sh</span> mqbroker <span class="token parameter variable">-c</span> /home/rocketmq/broker.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,13);function q(x,_){const s=t("ExternalLinkIcon");return l(),o("div",null,[p,d,a("p",null,[n("镜像地址："),a("a",m,[n("apache/rocketmq Tags | Docker Hub"),e(s)])]),v,a("p",null,[n("NameServer是一个简单的 "),a("a",u,[n("Topic"),e(s)]),n(" 路由注册中心，支持 Topic、Broker 的动态注册与发现，几乎无状态节点，因此可集群部署，节点之间无任何信息同步，所谓的集群部署和单机部署其实是一样的，需要多个NameServer保持高可用只需独立部署即可。")]),k,a("p",null,[n("控制台访问-地址ip:端口："),a("a",b,[n("http://192.168.100.100:8080"),e(s)])]),h,a("p",null,[n("控制台访问-地址ip:端口："),a("a",g,[n("http://192.168.100.100:8080"),e(s)])]),f])}const A=i(c,[["render",q],["__file","RocketMQ部署指南.html.vue"]]);export{A as default};
