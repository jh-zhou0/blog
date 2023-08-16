import{_ as t,r as p,o as c,c as o,a as n,d as s,b as e,e as i}from"./app-66d6b4fd.js";const l="/blog/kayson/Snipaste_2023-06-14_18-28-46.png",u={},d=n("h1",{id:"消息队列",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#消息队列","aria-hidden":"true"},"#"),s(" 消息队列")],-1),k={href:"https://gitee.com/jhzhou/kayson/tree/master/kayson-framework/kayson-spring-boot-starter-mq",target:"_blank",rel:"noopener noreferrer"},r={href:"http://www.redis.cn/topics/pubsub.html",target:"_blank",rel:"noopener noreferrer"},v={href:"http://www.redis.cn/topics/streams-intro.html",target:"_blank",rel:"noopener noreferrer"},m=i('<h2 id="_1-广播消费" tabindex="-1"><a class="header-anchor" href="#_1-广播消费" aria-hidden="true">#</a> 1.广播消费</h2><p>广播消费，是指消息发送到 Redis 时，所有消费者（应用 JVM 实例）收到，然后消费成功。如下图所示：</p><p><img src="'+l+`" alt="Snipaste_2023-06-14_18-28-46"></p><h3 id="_1-1使用场景" tabindex="-1"><a class="header-anchor" href="#_1-1使用场景" aria-hidden="true">#</a> 1.1使用场景</h3><p>例如说，在应用中，缓存了数据字典等配置表在内存中，可以通过 Redis 广播消费，实现每个应用节点都消费消息，刷新本地内存的缓存。</p><p>又例如说，我们基于 WebSocket 实现了 IM 聊天，在我们给用户主动发送消息时，因为我们不知道用户连接的是哪个提供 WebSocket 的应用，所以可以通过 Redis 广播消费。每个应用判断当前用户是否是和自己提供的 WebSocket 服务连接，如果是，则推送消息给用户。</p><h3 id="_1-2-实现源码" tabindex="-1"><a class="header-anchor" href="#_1-2-实现源码" aria-hidden="true">#</a> 1.2 实现源码</h3><p>广播消费基于 Redis Pub/Sub 实现：</p><p>定义 Redis 消息抽象基类 AbstractRedisMessage</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * Redis 消息抽象基类
 * 
 * <span class="token keyword">@author</span> zjh - kayson
 */</span>
<span class="token annotation punctuation">@Data</span>
<span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">AbstractRedisMessage</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 头
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> headers <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getHeader</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> headers<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">,</span> <span class="token class-name">String</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        headers<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>定义 Redis Channel Message 抽象类 AbstractChannelMessage</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * Redis Channel Message 抽象类
 * 
 * <span class="token keyword">@author</span> zjh - kayson
 */</span>
<span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">AbstractChannelMessage</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractRedisMessage</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 获得 Redis Channel
     * 
     * <span class="token keyword">@return</span> Channel
     */</span>
    <span class="token annotation punctuation">@JsonIgnore</span> <span class="token comment">// 避免序列化。原因是，Redis 发布 Channel 消息的时候，已经会指定。</span>
    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token class-name">String</span> <span class="token function">getChannel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>定义 RedisMessageInterceptor ，通过实现此接口，可在发送消息前、发送消息后、消费消息前、消费消息后执行一些操作</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">RedisMessageInterceptor</span> <span class="token punctuation">{</span>

    <span class="token keyword">default</span> <span class="token keyword">void</span> <span class="token function">sendMessageBefore</span><span class="token punctuation">(</span><span class="token class-name">AbstractRedisMessage</span> message<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">default</span> <span class="token keyword">void</span> <span class="token function">sendMessageAfter</span><span class="token punctuation">(</span><span class="token class-name">AbstractRedisMessage</span> message<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">default</span> <span class="token keyword">void</span> <span class="token function">consumeMessageBefore</span><span class="token punctuation">(</span><span class="token class-name">AbstractRedisMessage</span> message<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">default</span> <span class="token keyword">void</span> <span class="token function">consumeMessageAfter</span><span class="token punctuation">(</span><span class="token class-name">AbstractRedisMessage</span> message<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>
    
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>定义 Redis MQ 操作模板类 RedisMQTemplate</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * Redis MQ 操作模板类
 * 
 * <span class="token keyword">@author</span> zjh - kayson
 */</span>
<span class="token annotation punctuation">@AllArgsConstructor</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RedisMQTemplate</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Getter</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">RedisTemplate</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token operator">?</span><span class="token punctuation">&gt;</span></span> redisTemplate<span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * 拦截器数组
     */</span>
    <span class="token annotation punctuation">@Getter</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">RedisMessageInterceptor</span><span class="token punctuation">&gt;</span></span> interceptors <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 发送 Redis 消息，基于 Redis pub/sub 实现
     * 
     * <span class="token keyword">@param</span> <span class="token parameter">message</span> 消息
     */</span>
    <span class="token keyword">public</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractChannelMessage</span><span class="token punctuation">&gt;</span></span> <span class="token keyword">void</span> <span class="token function">send</span><span class="token punctuation">(</span><span class="token class-name">T</span> message<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token function">sendMessageBefore</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 发送消息</span>
            redisTemplate<span class="token punctuation">.</span><span class="token function">convertAndSend</span><span class="token punctuation">(</span>message<span class="token punctuation">.</span><span class="token function">getChannel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">JsonUtils</span><span class="token punctuation">.</span><span class="token function">toJsonString</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
            <span class="token function">sendMessageAfter</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 添加拦截器
     * 
     * <span class="token keyword">@param</span> <span class="token parameter">interceptor</span> 拦截器
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addInterceptor</span><span class="token punctuation">(</span><span class="token class-name">RedisMessageInterceptor</span> interceptor<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        interceptors<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>interceptor<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">sendMessageBefore</span><span class="token punctuation">(</span><span class="token class-name">AbstractRedisMessage</span> message<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 正序</span>
        interceptors<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>interceptor <span class="token operator">-&gt;</span> interceptor<span class="token punctuation">.</span><span class="token function">sendMessageBefore</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">sendMessageAfter</span><span class="token punctuation">(</span><span class="token class-name">AbstractRedisMessage</span> message<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 逆序</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> interceptors<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&gt;=</span> <span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">--</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            interceptors<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">sendMessageAfter</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>定义 Redis Pub/Sub 监听器抽象类 AbstractChannelMessageListener，用于实现广播消费</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * Redis Pub/Sub 监听器抽象类，用于实现广播消费
 * 
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">&lt;</span>T<span class="token punctuation">&gt;</span></span> 消息类型。一定要填写，不然会报错
 * <span class="token keyword">@author</span> zjh - kayson
 */</span>
<span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">AbstractChannelMessageListener</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractChannelMessage</span><span class="token punctuation">&gt;</span></span> <span class="token keyword">implements</span> <span class="token class-name">MessageListener</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 消息类型
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> messageType<span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * Redis Channel
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> channel<span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * RedisMQTemplate
     */</span>
    <span class="token annotation punctuation">@Setter</span>
    <span class="token keyword">private</span> <span class="token class-name">RedisMQTemplate</span> redisMQTemplate<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@SneakyThrows</span>
    <span class="token keyword">public</span> <span class="token class-name">AbstractChannelMessageListener</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>messageType <span class="token operator">=</span> <span class="token function">getMessageClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>channel <span class="token operator">=</span> messageType<span class="token punctuation">.</span><span class="token function">getDeclaredConstructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">newInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getChannel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 获得 Sub 订阅的 Redis Channel 通道
     * 
     * <span class="token keyword">@return</span> channel
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token function">getChannel</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> channel<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">onMessage</span><span class="token punctuation">(</span><span class="token class-name">Message</span> message<span class="token punctuation">,</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> pattern<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">T</span> messageObj <span class="token operator">=</span> <span class="token class-name">JsonUtils</span><span class="token punctuation">.</span><span class="token function">parseObject</span><span class="token punctuation">(</span>message<span class="token punctuation">.</span><span class="token function">getBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> messageType<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token function">consumeMessageBefore</span><span class="token punctuation">(</span>messageObj<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 消费消息</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">onMessage</span><span class="token punctuation">(</span>messageObj<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
            <span class="token function">consumeMessageAfter</span><span class="token punctuation">(</span>messageObj<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 处理消息
     *
     * <span class="token keyword">@param</span> <span class="token parameter">message</span> 消息
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">void</span> <span class="token function">onMessage</span><span class="token punctuation">(</span><span class="token class-name">T</span> message<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 通过解析类上的泛型，获得消息类型
     * 
     * <span class="token keyword">@return</span> 消息类型
     */</span>
    <span class="token annotation punctuation">@SuppressWarnings</span><span class="token punctuation">(</span><span class="token string">&quot;unchecked&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token function">getMessageClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Type</span> type <span class="token operator">=</span> <span class="token class-name">TypeUtil</span><span class="token punctuation">.</span><span class="token function">getTypeArgument</span><span class="token punctuation">(</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>type <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalStateException</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">&quot;类型(%s) 需要设置消息类型&quot;</span><span class="token punctuation">,</span> <span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">)</span> type<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">consumeMessageBefore</span><span class="token punctuation">(</span><span class="token class-name">AbstractRedisMessage</span> message<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">assert</span> redisMQTemplate <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">RedisMessageInterceptor</span><span class="token punctuation">&gt;</span></span> interceptors <span class="token operator">=</span> redisMQTemplate<span class="token punctuation">.</span><span class="token function">getInterceptors</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 正序</span>
        interceptors<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>interceptor <span class="token operator">-&gt;</span> interceptor<span class="token punctuation">.</span><span class="token function">consumeMessageBefore</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">consumeMessageAfter</span><span class="token punctuation">(</span><span class="token class-name">AbstractRedisMessage</span> message<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">assert</span> redisMQTemplate <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">RedisMessageInterceptor</span><span class="token punctuation">&gt;</span></span> interceptors <span class="token operator">=</span> redisMQTemplate<span class="token punctuation">.</span><span class="token function">getInterceptors</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 逆序</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> interceptors<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&gt;=</span> <span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">--</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            interceptors<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">consumeMessageAfter</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在配置类 KaysonMQAutoConfiguration 中，注册 RedisMQTemplate Bean对象，创建 Redis Pub/Sub 广播消费的容器</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@AutoConfiguration</span><span class="token punctuation">(</span>after <span class="token operator">=</span> <span class="token class-name">KaysonRedisAutoConfiguration</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">KaysonMQAutoConfiguration</span> <span class="token punctuation">{</span>
    
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">RedisMQTemplate</span> <span class="token function">redisMQTemplate</span><span class="token punctuation">(</span><span class="token class-name">StringRedisTemplate</span> redisTemplate<span class="token punctuation">,</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">RedisMessageInterceptor</span><span class="token punctuation">&gt;</span></span> interceptors<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">RedisMQTemplate</span> redisMQTemplate <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RedisMQTemplate</span><span class="token punctuation">(</span>redisTemplate<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 添加拦截器</span>
        interceptors<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>redisMQTemplate<span class="token operator">::</span><span class="token function">addInterceptor</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> redisMQTemplate<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 创建 Redis Pub/Sub 广播消费的容器
     */</span>
    <span class="token annotation punctuation">@Bean</span><span class="token punctuation">(</span>initMethod <span class="token operator">=</span> <span class="token string">&quot;start&quot;</span><span class="token punctuation">,</span> destroyMethod <span class="token operator">=</span> <span class="token string">&quot;stop&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">RedisMessageListenerContainer</span> <span class="token function">redisMessageListenerContainer</span><span class="token punctuation">(</span>
            <span class="token class-name">RedisMQTemplate</span> redisMQTemplate<span class="token punctuation">,</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">AbstractChannelMessageListener</span><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span> listeners<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 创建 RedisMessageListenerContainer 对象</span>
        <span class="token class-name">RedisMessageListenerContainer</span> container <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RedisMessageListenerContainer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 设置 RedisConnection 工厂</span>
        container<span class="token punctuation">.</span><span class="token function">setConnectionFactory</span><span class="token punctuation">(</span>redisMQTemplate<span class="token punctuation">.</span><span class="token function">getRedisTemplate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getRequiredConnectionFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 添加监听器</span>
        listeners<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>listener <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
            listener<span class="token punctuation">.</span><span class="token function">setRedisMQTemplate</span><span class="token punctuation">(</span>redisMQTemplate<span class="token punctuation">)</span><span class="token punctuation">;</span>
            container<span class="token punctuation">.</span><span class="token function">addMessageListener</span><span class="token punctuation">(</span>listener<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">ChannelTopic</span><span class="token punctuation">(</span>listener<span class="token punctuation">.</span><span class="token function">getChannel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;[redisMessageListenerContainer][注册 Channel({}) 对应的监听器({})]&quot;</span><span class="token punctuation">,</span>
                    listener<span class="token punctuation">.</span><span class="token function">getChannel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> listener<span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> container<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-3使用" tabindex="-1"><a class="header-anchor" href="#_1-3使用" aria-hidden="true">#</a> 1.3使用</h3><p>以部门dept为例：</p><p>在 message 包下 dept 包中，创建部门消息类</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * 部门数据刷新 Message
 * 
 * <span class="token keyword">@author</span> zjh - kayson
 */</span>
<span class="token annotation punctuation">@EqualsAndHashCode</span><span class="token punctuation">(</span>callSuper <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@ToString</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DeptRefreshMessage</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractChannelMessage</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getChannel</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;system.dept.refresh&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 producer 包下 dept 包中，创建部们消息生产者类</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * Dept 部门相关消息的 Producer
 * 
 * <span class="token keyword">@author</span> zjh - kayson
 */</span>
<span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DeptProducer</span> <span class="token punctuation">{</span>
    
    <span class="token annotation punctuation">@Resource</span>
    <span class="token keyword">private</span> <span class="token class-name">RedisMQTemplate</span> redisMQTemplate<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 发送 <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">DeptRefreshMessage</span></span><span class="token punctuation">}</span> 消息
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">sendDeptRefreshMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">DeptRefreshMessage</span> message <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DeptRefreshMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        redisMQTemplate<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 consumer 包下 dept 包中，创建部门消息消费者类</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * 针对 <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">DeptRefreshMessage</span></span><span class="token punctuation">}</span> 的消费者
 * 
 * <span class="token keyword">@author</span> zjh - kayson
 */</span>
<span class="token annotation punctuation">@Component</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DeptRefreshConsumer</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractChannelMessageListener</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">DeptRefreshMessage</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>
    
    <span class="token annotation punctuation">@Resource</span>
    <span class="token keyword">private</span> <span class="token class-name">DeptService</span> deptService<span class="token punctuation">;</span>
    
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">onMessage</span><span class="token punctuation">(</span><span class="token class-name">DeptRefreshMessage</span> message<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;[onMessage][收到 Dept 刷新消息]&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        deptService<span class="token punctuation">.</span><span class="token function">initLocalCache</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在新建部门、更新部门等场景下，通过发送消息实现本地缓存实时刷新</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Service</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DeptServiceImpl</span> <span class="token keyword">implements</span> <span class="token class-name">DeptService</span><span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
	<span class="token annotation punctuation">@Resource</span>
    <span class="token keyword">private</span> <span class="token class-name">DeptProducer</span> deptProducer<span class="token punctuation">;</span>
    
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Long</span> <span class="token function">createDept</span><span class="token punctuation">(</span><span class="token class-name">DeptCreateReqVO</span> reqVO<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// ...</span>
        <span class="token comment">// 发送刷新消息</span>
        deptProducer<span class="token punctuation">.</span><span class="token function">sendDeptRefreshMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// ...</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,30);function b(g,y){const a=p("ExternalLinkIcon");return c(),o("div",null,[d,n("p",null,[n("a",k,[s("kayson-spring-boot-starter-mq"),e(a)]),s(" 技术组件，基于 Redis 实现分布式消息队列：")]),n("ul",null,[n("li",null,[n("p",null,[s("使用 "),n("a",r,[s("Pub/Sub"),e(a)]),s("特性，提供【广播】消费的能力。")])]),n("li",null,[n("p",null,[s("使用 "),n("a",v,[s("Stream"),e(a)]),s("特性，提供【集群】消费的能力。")])])]),m])}const f=t(u,[["render",b],["__file","消息队列.html.vue"]]);export{f as default};
