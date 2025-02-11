"""
程序功能：抓取必应每日一图，设置为桌面壁纸
"""

import urllib.request
import requests
import os.path
import ctypes


def save_img(img_url, img_name, dirname):
    # 保存图片到磁盘文件夹dirname中
    try:
        if not os.path.exists(dirname):
            print('文件夹', dirname, '不存在，重新建立')
            os.makedirs(dirname)
        # 拼接目录与文件名，得到图片路径
        filepath = os.path.join(dirname, img_name)
        # 下载图片，并保存到文件夹中
        urllib.request.urlretrieve(img_url, filepath)
    except IOError as e:
        print('文件操作失败', e)
    except Exception as e:
        print('错误 ：', e)
    print("保存", filepath, "\033[4;32;40msuccessfully!\033[0m")

    return filepath.replace('"', '')

# 请求网页，跳转到最终 img 地址


def get_img_url():
    r = requests.get(
        'https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&uhd=1&uhdwidth=7680&uhdheight=4320')
    imgJson = r.json()['images'][0]
    img_url = 'https://cn.bing.com' + imgJson['url']  # 得到图片文件的网址

    dateArr = list(imgJson['enddate'])
    dateArr.insert(8, '-')
    dateArr.insert(6, '-')
    dateArr.insert(4, '-')
    dateStr = ''.join(dateArr)

    print(imgJson)

    name = dateStr + \
        imgJson['copyright'].split('，')[0].split(',')[0].split(' ')[0] + '.jpg'

    resName = name.replace('“', "'").replace('”', "'").replace('"', "'")

    print(resName)

    print('链接：', img_url)

    return img_url, resName

# 设置图片绝对路径 filepath 所指向的图片为壁纸


def set_img_as_wallpaper(filepath):
    ctypes.windll.user32.SystemParametersInfoW(20, 0, filepath, 0)


def main():
    dirname = "D:\\BING壁纸"       # 图片要被保存在的位置
    img = get_img_url()
    filepath = save_img(img[0], img[1], dirname)   # 图片文件的的路径
    print(filepath)
    set_img_as_wallpaper(filepath)


main()
