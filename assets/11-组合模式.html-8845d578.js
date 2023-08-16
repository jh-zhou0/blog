import{_ as n,o as s,c as a,e}from"./app-66d6b4fd.js";const p="/blog/design-patterns/Snipaste_2023-07-19_15-12-08.png",t={},o=e('<h2 id="组合模式-composite" tabindex="-1"><a class="header-anchor" href="#组合模式-composite" aria-hidden="true">#</a> 组合模式(Composite)</h2><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述" aria-hidden="true">#</a> 1.概述</h2><p>将对象组合成树形结构以表示&quot;部分-整体&quot;的层次结构。&quot;Composite使得用户对单个对象和组合对象的使用具有一致性。</p><h2 id="_2-适用性" tabindex="-1"><a class="header-anchor" href="#_2-适用性" aria-hidden="true">#</a> 2.适用性</h2><ul><li>表示对象的部分-整体层次结构。</li><li>忽略组合对象与单个对象的不同，统一地使用组合结构中的所有对象。</li></ul><h2 id="_3-参与者" tabindex="-1"><a class="header-anchor" href="#_3-参与者" aria-hidden="true">#</a> 3.参与者</h2><ul><li><strong>Component</strong> 为组合中的对象声明接口。 在适当的情况下，实现所有类共有接口的缺省行为。声明一个接口用于访问和管理Component的子组件。(可选)在递归结构中定义一个接口，用于访问一个父部件，并在合适的情况下实现它。</li><li><strong>Leaf</strong> 在组合中表示叶节点对象，叶节点没有子节点。 在组合中定义节点对象的行为。</li><li><strong>Composite</strong> 定义子部件的行为。存储子部件。在Component接口中实现与子部件有关的操作。</li><li><strong>Client</strong> 通过Component接口操纵组合部件的对象。</li></ul><h2 id="_4-类图" tabindex="-1"><a class="header-anchor" href="#_4-类图" aria-hidden="true">#</a> 4.类图</h2><p><img src="'+p+`" alt="Snipaste_2023-07-19_15-12-08"></p><h2 id="_5-示例" tabindex="-1"><a class="header-anchor" href="#_5-示例" aria-hidden="true">#</a> 5.示例</h2><ul><li><strong>Component</strong></li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">Employer</span> <span class="token punctuation">{</span>
    
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    
    <span class="token keyword">protected</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Employer</span><span class="token punctuation">&gt;</span></span> employers<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setName</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Employer</span><span class="token punctuation">&gt;</span></span> <span class="token function">getEmployers</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> employers<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">void</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token class-name">Employer</span> employer<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">void</span> <span class="token function">delete</span><span class="token punctuation">(</span><span class="token class-name">Employer</span> employer<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>Leaf</strong></li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Programmer</span> <span class="token keyword">extends</span> <span class="token class-name">Employer</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token class-name">Programmer</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">setName</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 程序员, 表示没有下属了</span>
        employers <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token class-name">Employer</span> employer<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">delete</span><span class="token punctuation">(</span><span class="token class-name">Employer</span> employer<span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ProjectAssistant</span> <span class="token keyword">extends</span> <span class="token class-name">Employer</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token class-name">ProjectAssistant</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">setName</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 项目助理, 表示没有下属了</span>
        employers <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token class-name">Employer</span> employer<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">delete</span><span class="token punctuation">(</span><span class="token class-name">Employer</span> employer<span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>Composite</strong></li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ProjectManager</span> <span class="token keyword">extends</span> <span class="token class-name">Employer</span><span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token class-name">ProjectManager</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">setName</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
        employers <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token class-name">Employer</span> employer<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        employers<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>employer<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">delete</span><span class="token punctuation">(</span><span class="token class-name">Employer</span> employer<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        employers<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>employer<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>测试</strong></li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CompositeTest</span> <span class="token punctuation">{</span>
    
    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Employer</span> pm <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ProjectManager</span><span class="token punctuation">(</span><span class="token string">&quot;项目经理&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Employer</span> pa <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ProjectAssistant</span><span class="token punctuation">(</span><span class="token string">&quot;项目助理&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Employer</span> programmer1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Programmer</span><span class="token punctuation">(</span><span class="token string">&quot;程序员一&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Employer</span> programmer2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Programmer</span><span class="token punctuation">(</span><span class="token string">&quot;程序员二&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 为项目经理添加项目助理</span>
        pm<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>pa<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 为项目经理添加程序员</span>
        pm<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>programmer1<span class="token punctuation">)</span><span class="token punctuation">;</span>
        pm<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>programmer2<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Employer</span><span class="token punctuation">&gt;</span></span> ems <span class="token operator">=</span> pm<span class="token punctuation">.</span><span class="token function">getEmployers</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Employer</span> em <span class="token operator">:</span> ems<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>em<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>结果</strong></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>项目助理
程序员一
程序员二
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,21),c=[o];function l(i,u){return s(),a("div",null,c)}const r=n(t,[["render",l],["__file","11-组合模式.html.vue"]]);export{r as default};
