import{_ as o,r,o as i,c as d,a as e,d as s,b as a,e as c}from"./app-66d6b4fd.js";const t={},l=c(`<h1 id="docker安装" tabindex="-1"><a class="header-anchor" href="#docker安装" aria-hidden="true">#</a> Docker安装</h1><h2 id="linux-centos服务器" tabindex="-1"><a class="header-anchor" href="#linux-centos服务器" aria-hidden="true">#</a> Linux-CentOS服务器</h2><h3 id="centos7安装docker" tabindex="-1"><a class="header-anchor" href="#centos7安装docker" aria-hidden="true">#</a> centOS7安装Docker</h3><p>第一步：安装必要的一些系统工具</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum <span class="token function">install</span> <span class="token parameter variable">-y</span> yum-utils device-mapper-persistent-data lvm2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>第二步：添加软件源信息</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>第三步：更新并安装Docker-CE</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum makecache fast
yum <span class="token parameter variable">-y</span> <span class="token function">install</span> docker-ce
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>第四步：开启Docker服务</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 启动docker服务</span>
<span class="token function">service</span> <span class="token function">docker</span> start
<span class="token comment"># 或</span>
systemctl start <span class="token function">docker</span>
<span class="token comment"># 停止docker服务</span>
systemctl stop <span class="token function">docker</span>
<span class="token comment"># 重启docker</span>
systemctl restart <span class="token function">docker</span>
<span class="token comment"># 设置docker的开机自启 </span>
systemctl <span class="token builtin class-name">enable</span> <span class="token function">docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第五步：测试是否安装成功</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> <span class="token parameter variable">-v</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><hr>`,14),p={href:"https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors?accounttraceid=e608bc86031b4ff69281dd3595fcae44vdqj",target:"_blank",rel:"noopener noreferrer"},u=c(`<p>通过修改daemon配置文件/etc/docker/daemon.json来使用加速器</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /etc/docker
<span class="token function">sudo</span> <span class="token function">tee</span> /etc/docker/daemon.json <span class="token operator">&lt;&lt;-</span><span class="token string">&#39;EOF&#39;
{
  &quot;registry-mirrors&quot;: [
        &quot;https://3gpf30ag.mirror.aliyuncs.com&quot;,
        &quot;https://dockerproxy.com&quot;,
        &quot;https://hub-mirror.c.163.com&quot;,
        &quot;https://mirror.baidubce.com&quot;,
        &quot;https://ccr.ccs.tencentyun.com&quot;
  ]
}
EOF</span>
<span class="token function">sudo</span> systemctl daemon-reload
<span class="token function">sudo</span> systemctl restart <span class="token function">docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>源信息：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>阿里云：https://3gpf30ag.mirror.aliyuncs.com；
DockerProxy：https://dockerproxy.com；
网易源：https://hub-mirror.c.163.com；
百度源：https://mirror.baidubce.com；
腾讯源：https://ccr.ccs.tencentyun.com；
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="centos7安装docker-compose" tabindex="-1"><a class="header-anchor" href="#centos7安装docker-compose" aria-hidden="true">#</a> centOS7安装Docker Compose</h3><p><strong>1 官方安装</strong></p>`,6),m={href:"https://github.com/docker/compose/releases",target:"_blank",rel:"noopener noreferrer"},v=c(`<p><strong>1.1执行以下命令</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-SL</span> https://github.com/docker/compose/releases/download/v2.18.1/docker-compose-linux-x86_64 <span class="token parameter variable">-o</span> /usr/local/bin/docker-compose
或使用国内源
<span class="token function">curl</span> <span class="token parameter variable">-SL</span> https://get.daocloud.io/docker/compose/releases/download/v2.18.1/docker-compose-linux-x86_64 <span class="token parameter variable">-o</span> /usr/local/bin/docker-compose
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>1.2添加执行权限</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">chmod</span> +x /usr/local/bin/docker-compose
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>1.3检查docker-compose版本</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> compose version
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>2 手动安装</strong></p>`,7),b={href:"https://github.com/docker/compose/releases",target:"_blank",rel:"noopener noreferrer"},h=e("p",null,[s("选择相应版本,下载"),e("strong",null,"docker-compose-Linux-x86_64"),s("到本地或者服务器中 更名为"),e("code",null,"docker-compose"),s(",并移动到 /usr/local/bin 目录下")],-1),k=e("p",null,[s("然后执行"),e("strong",null,"官方安装"),s("2，3步")],-1);function g(f,_){const n=r("ExternalLinkIcon");return i(),d("div",null,[l,e("p",null,[s("第六步：配置"),e("a",p,[s("镜像加速"),a(n)])]),u,e("p",null,[s("官网选择版本 "),e("a",m,[s("https://github.com/docker/compose/releases"),a(n)])]),v,e("p",null,[s("官网下载 "),e("a",b,[s("https://github.com/docker/compose/releases"),a(n)])]),h,k])}const y=o(t,[["render",g],["__file","Docker安装.html.vue"]]);export{y as default};
