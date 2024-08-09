" 设置系统剪贴板为默认剪贴板 (可选值: unnamed, unnamedplus, autoselect)
set clipboard=unnamed

" 显示行号 (可选值: number, nonumber, relativenumber)
set number

" 显示当前模式 (可选值: showmode, noshowmode)
set showmode

" 显示输入的命令 (可选值: showcmd, noshowcmd)
set showcmd

" 启用鼠标支持 (可选值: a (所有模式), n (普通模式), v (可视模式), i (插入模式), c (命令行模式), h (帮助文件), r (点击进入文件))
set mouse=a 

" 设置编码为UTF-8 (可选值: utf-8, latin1, euc-jp, sjis 等)
set encoding=utf-8

" 启用256色支持 (可选值: 8, 16, 88, 256)
set t_Co=256

" 开启文件类型检测 (可选值: on, off)
filetype indent on

" 启用自动缩进 (可选值: autoindent, noautoindent, smartindent, cindent)
set autoindent

" 设置制表符宽度为2个空格 (可选值: 任意正整数)
set tabstop=2

" 设置软制表符宽度为2个空格 (可选值: 任意正整数)
set softtabstop=2

" 将制表符扩展为空格 (可选值: expandtab, noexpandtab)
set expandtab

" 设置自动缩进的空格数为4 (可选值: 任意正整数)
set shiftwidth=4

" 高亮显示当前行 (可选值: cursorline, nocursorline)
set cursorline

" 自动换行 (可选值: wrap, nowrap)
set wrap

" 设置文本宽度为80个字符 (可选值: 任意正整数)
set textwidth=80

" 只在空白字符处换行 (可选值: linebreak, nolinebreak)
set linebreak

" 设置光标上下的最小行数 (可选值: 任意非负整数)
set scrolloff=5

" 设置自动换行的边距 (可选值: 任意非负整数)
set wrapmargin=2

" 始终显示状态栏 (可选值: 0 (从不), 1 (仅当有多个窗口时), 2 (始终))
set laststatus=2

" 高亮显示匹配的括号 (可选值: showmatch, noshowmatch)
set showmatch

" 高亮显示搜索结果 (可选值: hlsearch, nohlsearch)
set hlsearch

" 在输入搜索模式时同时高亮部分的匹配 (可选值: incsearch, noincsearch)
set incsearch

" 语法高亮 (可选值: on, off)
syntax on

" 不创建交换文件 (可选值: swapfile, noswapfile)
set noswapfile

" 出错不发出响声 (可选值: errorbells, noerrorbells)
set noeb

" 出错也不闪屏 (可选值: visualbell, novisualbell)
set vb t_vb=

" 用于区别不同模式下的光标区别
if has("autocmd")
  au VimEnter,InsertLeave * silent execute '!echo -ne "\e[2 q"' | redraw!
  au InsertEnter,InsertChange *
    \ if v:insertmode == 'i' | 
    \   silent execute '!echo -ne "\e[6 q"' | redraw! |
    \ elseif v:insertmode == 'r' |
    \   silent execute '!echo -ne "\e[4 q"' | redraw! |
    \ endif
  au VimLeave * silent execute '!echo -ne "\e[ q"' | redraw!
endif