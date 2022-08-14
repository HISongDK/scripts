set clipboard=unnamed
set number
set showmode
set showcmd
set mouse=a 
set encoding=utf-8
set t_Co=256
filetype indent on
set autoindent
set tabstop=2
set softtabstop=2
set expandtab
set shiftwidth=4
set cursorline
set wrap
set textwidth=80
set linebreak
set scrolloff=5
set wrapmargin=2
set laststatus=2
set showmatch
set hlsearch
set incsearch
" 语法高亮
syntax on
" 不创建交换文件
set noswapfile
" 出错不发出响声
set noeb
" 出错也不闪屏
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