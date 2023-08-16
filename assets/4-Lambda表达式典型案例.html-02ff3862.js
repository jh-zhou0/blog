import{_ as n,o as s,c as a,e as p}from"./app-66d6b4fd.js";const t={},e=p(`<h1 id="lambda表达式典型案例" tabindex="-1"><a class="header-anchor" href="#lambda表达式典型案例" aria-hidden="true">#</a> Lambda表达式典型案例</h1><h2 id="案例一" tabindex="-1"><a class="header-anchor" href="#案例一" aria-hidden="true">#</a> 案例一</h2><p><strong>需求：</strong></p><p>调用Collections.sort()方法，通过定制排序比较两个Employee（先比较年龄，年龄相同按姓名比较），使用Lambda表达式作为参数传递。</p><p><strong>实现：</strong></p><p>这里，我们先创建一个Employee类，为了满足需求，我们在Employee类中定义了姓名、年龄和工资三个字段，如下所示。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Data</span>
<span class="token annotation punctuation">@Builder</span>
<span class="token annotation punctuation">@ToString</span>
<span class="token annotation punctuation">@NoArgsConstructor</span>
<span class="token annotation punctuation">@AllArgsConstructor</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Employee</span> <span class="token keyword">implements</span> <span class="token class-name">Serializable</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">long</span> serialVersionUID <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">9079722457749166858L</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> age<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Double</span> salary<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们在TestLambda类中定义一个成员变量employees，employees变量是一个List集合，存储了Employee的一个列表，如下所示。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">protected</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Employee</span><span class="token punctuation">&gt;</span></span> employees <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span>
    <span class="token keyword">new</span> <span class="token class-name">Employee</span><span class="token punctuation">(</span><span class="token string">&quot;张三&quot;</span><span class="token punctuation">,</span> <span class="token number">18</span><span class="token punctuation">,</span> <span class="token number">9999.99</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">new</span> <span class="token class-name">Employee</span><span class="token punctuation">(</span><span class="token string">&quot;李四&quot;</span><span class="token punctuation">,</span> <span class="token number">38</span><span class="token punctuation">,</span> <span class="token number">5555.55</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">new</span> <span class="token class-name">Employee</span><span class="token punctuation">(</span><span class="token string">&quot;王五&quot;</span><span class="token punctuation">,</span> <span class="token number">60</span><span class="token punctuation">,</span> <span class="token number">6666.66</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">new</span> <span class="token class-name">Employee</span><span class="token punctuation">(</span><span class="token string">&quot;赵六&quot;</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">7777.77</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">new</span> <span class="token class-name">Employee</span><span class="token punctuation">(</span><span class="token string">&quot;田七&quot;</span><span class="token punctuation">,</span> <span class="token number">58</span><span class="token punctuation">,</span> <span class="token number">3333.33</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>前期的准备工作完成了，接下来，我们就可以实现具体的业务逻辑了。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">test1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span>employees<span class="token punctuation">,</span> <span class="token punctuation">(</span>e1<span class="token punctuation">,</span> e2<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>e1<span class="token punctuation">.</span><span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> e2<span class="token punctuation">.</span><span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> e1<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">compareTo</span><span class="token punctuation">(</span>e2<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">compare</span><span class="token punctuation">(</span>e1<span class="token punctuation">.</span><span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> e2<span class="token punctuation">.</span><span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    employees<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token operator">::</span><span class="token function">println</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行test1方法，得出的结果信息如下所示。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>Employee<span class="token punctuation">(</span>name<span class="token operator">=</span>赵六, <span class="token assign-left variable">age</span><span class="token operator">=</span><span class="token number">8</span>, <span class="token assign-left variable">salary</span><span class="token operator">=</span><span class="token number">7777.77</span><span class="token punctuation">)</span>
Employee<span class="token punctuation">(</span>name<span class="token operator">=</span>张三, <span class="token assign-left variable">age</span><span class="token operator">=</span><span class="token number">18</span>, <span class="token assign-left variable">salary</span><span class="token operator">=</span><span class="token number">9999.99</span><span class="token punctuation">)</span>
Employee<span class="token punctuation">(</span>name<span class="token operator">=</span>李四, <span class="token assign-left variable">age</span><span class="token operator">=</span><span class="token number">38</span>, <span class="token assign-left variable">salary</span><span class="token operator">=</span><span class="token number">5555.55</span><span class="token punctuation">)</span>
Employee<span class="token punctuation">(</span>name<span class="token operator">=</span>田七, <span class="token assign-left variable">age</span><span class="token operator">=</span><span class="token number">58</span>, <span class="token assign-left variable">salary</span><span class="token operator">=</span><span class="token number">3333.33</span><span class="token punctuation">)</span>
Employee<span class="token punctuation">(</span>name<span class="token operator">=</span>王五, <span class="token assign-left variable">age</span><span class="token operator">=</span><span class="token number">60</span>, <span class="token assign-left variable">salary</span><span class="token operator">=</span><span class="token number">6666.66</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果想倒叙输出如何处理呢，只需要在将<code>return Integer.compare(e1.getAge(), e2.getAge());</code>修改成<code>-return Integer.compare(e1.getAge(), e2.getAge());</code>即可，如下所示。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">test1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span>employees<span class="token punctuation">,</span> <span class="token punctuation">(</span>e1<span class="token punctuation">,</span> e2<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>e1<span class="token punctuation">.</span><span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> e2<span class="token punctuation">.</span><span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> e1<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">compareTo</span><span class="token punctuation">(</span>e2<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token operator">-</span><span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">compare</span><span class="token punctuation">(</span>e1<span class="token punctuation">.</span><span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> e2<span class="token punctuation">.</span><span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    employees<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token operator">::</span><span class="token function">println</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再次运行test1方法，得出的结果信息如下所示。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>Employee<span class="token punctuation">(</span>name<span class="token operator">=</span>王五, <span class="token assign-left variable">age</span><span class="token operator">=</span><span class="token number">60</span>, <span class="token assign-left variable">salary</span><span class="token operator">=</span><span class="token number">6666.66</span><span class="token punctuation">)</span>
Employee<span class="token punctuation">(</span>name<span class="token operator">=</span>田七, <span class="token assign-left variable">age</span><span class="token operator">=</span><span class="token number">58</span>, <span class="token assign-left variable">salary</span><span class="token operator">=</span><span class="token number">3333.33</span><span class="token punctuation">)</span>
Employee<span class="token punctuation">(</span>name<span class="token operator">=</span>李四, <span class="token assign-left variable">age</span><span class="token operator">=</span><span class="token number">38</span>, <span class="token assign-left variable">salary</span><span class="token operator">=</span><span class="token number">5555.55</span><span class="token punctuation">)</span>
Employee<span class="token punctuation">(</span>name<span class="token operator">=</span>张三, <span class="token assign-left variable">age</span><span class="token operator">=</span><span class="token number">18</span>, <span class="token assign-left variable">salary</span><span class="token operator">=</span><span class="token number">9999.99</span><span class="token punctuation">)</span>
Employee<span class="token punctuation">(</span>name<span class="token operator">=</span>赵六, <span class="token assign-left variable">age</span><span class="token operator">=</span><span class="token number">8</span>, <span class="token assign-left variable">salary</span><span class="token operator">=</span><span class="token number">7777.77</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="案例二" tabindex="-1"><a class="header-anchor" href="#案例二" aria-hidden="true">#</a> 案例二</h2><p><strong>需求：</strong></p><p>1.声明函数式接口，接口中声明抽象方法<code>public String getValue(String str);</code></p><p>2.声明类TestLambda，类中编写方法使用接口作为参数，将一个字符串转换为大写，并作为方法的返回值。</p><p>3.再将一个字符串的第2个和第4个索引位置进行截取子串。</p><p><strong>实现：</strong></p><p>首先，创建一个函数式接口MyFunction，在MyFunction接口上加上注解@FunctionalInterface标识接口是一个函数式接口。如下所示。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@FunctionalInterface</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">MyFunction</span> <span class="token punctuation">{</span>
    
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getValue</span><span class="token punctuation">(</span><span class="token class-name">String</span> str<span class="token punctuation">)</span><span class="token punctuation">;</span>
    
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在TestLambda类中声明stringHandler方法，参数分别为待处理的字符串和函数式接口的实例，方法中的逻辑就是调用函数式接口的方法来处理字符串，如下所示。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">stringHandler</span><span class="token punctuation">(</span><span class="token class-name">String</span> str<span class="token punctuation">,</span> <span class="token class-name">MyFunction</span> myFunction<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> myFunction<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们实现将一个字符串转换为大写的逻辑，如下所示。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">test2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name">String</span> value <span class="token operator">=</span> <span class="token function">stringHandler</span><span class="token punctuation">(</span><span class="token string">&quot;kayson&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>s<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> s<span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行test2方法，得出如下的结果信息。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token constant">KAYSON</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们再来实现字符串截取的操作，如下所示。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">test3</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name">String</span> value <span class="token operator">=</span> <span class="token function">stringHandler</span><span class="token punctuation">(</span><span class="token string">&quot;kayson&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>s<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> s<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意：需求中是按照第2个和第4个索引位置进行截取子串，字符串的下标是从0开始的，所以这里截取字符串时使用的是substring(1, 3)，而不是substring(2, 4)，这也是很多小伙伴容易犯的错误。</strong></p><p><strong>另外，使用上述Lambda表达式形式，可以实现字符串的任意处理，并返回处理后的新字符串。</strong></p><p>运行test3方法，结果如下所示。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>ay
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="案例三" tabindex="-1"><a class="header-anchor" href="#案例三" aria-hidden="true">#</a> 案例三</h2><p><strong>需求：</strong></p><p>1.声明一个带两个泛型的函数式接口，泛型类型为&lt;T, R&gt;，其中，T作为参数的类型，R作为返回值的类型。</p><p>2.接口中声明对象的抽象方法。</p><p>3.在TestLambda类中声明方法。使用接口作为参数计算两个long型参数的和。</p><p>4.再就按两个long型参数的乘积。</p><p><strong>实现：</strong></p><p>首先，我们按照需求定义函数式接口MyFunc，如下所示。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@FunctionalInterface</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">MyFunc</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">,</span> <span class="token class-name">R</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>

    <span class="token class-name">R</span> <span class="token function">getValue</span><span class="token punctuation">(</span><span class="token class-name">T</span> t1<span class="token punctuation">,</span> <span class="token class-name">T</span> t2<span class="token punctuation">)</span><span class="token punctuation">;</span>
    
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们在TestLambda类中创建一个处理两个long型数据的方法，如下所示。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">operate</span><span class="token punctuation">(</span><span class="token class-name">Long</span> num1<span class="token punctuation">,</span> <span class="token class-name">Long</span> num2<span class="token punctuation">,</span> <span class="token class-name">MyFunc</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">,</span> <span class="token class-name">Long</span><span class="token punctuation">&gt;</span></span> myFunc<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>myFunc<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span>num1<span class="token punctuation">,</span> num2<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以使用下面的方法来完成两个long型参数的和。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">test4</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token function">operate</span><span class="token punctuation">(</span><span class="token number">100L</span><span class="token punctuation">,</span> <span class="token number">200L</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> x <span class="token operator">+</span> y<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行test4方法，结果如下所示。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">300</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>实现两个long型数据的乘积，也很简单。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">test5</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token function">operate</span><span class="token punctuation">(</span><span class="token number">100L</span><span class="token punctuation">,</span> <span class="token number">200L</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> x <span class="token operator">*</span> y<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行test5方法，结果如下所示。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token number">20000</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,56),o=[e];function c(l,u){return s(),a("div",null,o)}const k=n(t,[["render",c],["__file","4-Lambda表达式典型案例.html.vue"]]);export{k as default};
