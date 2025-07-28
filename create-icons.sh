#!/bin/bash

# 创建 macOS 风格的圆角图标
# 需要安装 ImageMagick: brew install imagemagick

echo "正在创建 macOS 风格的圆角图标..."

# 创建临时目录
mkdir -p temp_icons

# 定义图标尺寸
sizes=(16 32 64 128 256 512 1024)

# 为每个尺寸创建圆角图标
for size in "${sizes[@]}"; do
    echo "生成 ${size}x${size} 图标..."
    
    # 创建圆角蒙版
    convert -size ${size}x${size} xc:none -fill black -draw "roundrectangle 0,0 ${size},${size} ${size/8},${size/8}" temp_icons/mask_${size}.png
    
    # 调整原图尺寸并应用圆角
    convert build/icon.png -resize ${size}x${size} temp_icons/resized_${size}.png
    convert temp_icons/resized_${size}.png temp_icons/mask_${size}.png -compose copy-opacity -composite temp_icons/rounded_${size}.png
done

# 创建 .icns 文件
echo "创建 .icns 文件..."
mkdir -p temp_icons/icon.iconset

# 复制不同尺寸的图标到 iconset
cp temp_icons/rounded_16.png temp_icons/icon.iconset/icon_16x16.png
cp temp_icons/rounded_32.png temp_icons/icon.iconset/icon_16x16@2x.png
cp temp_icons/rounded_32.png temp_icons/icon.iconset/icon_32x32.png
cp temp_icons/rounded_64.png temp_icons/icon.iconset/icon_32x32@2x.png
cp temp_icons/rounded_128.png temp_icons/icon.iconset/icon_128x128.png
cp temp_icons/rounded_256.png temp_icons/icon.iconset/icon_128x128@2x.png
cp temp_icons/rounded_256.png temp_icons/icon.iconset/icon_256x256.png
cp temp_icons/rounded_512.png temp_icons/icon.iconset/icon_256x256@2x.png
cp temp_icons/rounded_512.png temp_icons/icon.iconset/icon_512x512.png
cp temp_icons/rounded_1024.png temp_icons/icon.iconset/icon_512x512@2x.png

# 生成 .icns 文件
iconutil -c icns temp_icons/icon.iconset -o build/icon.icns

# 创建 Windows .ico 文件
echo "创建 .ico 文件..."
convert temp_icons/rounded_16.png temp_icons/rounded_32.png temp_icons/rounded_48.png temp_icons/rounded_256.png build/icon.ico

# 更新主图标文件为 512x512 的圆角版本
cp temp_icons/rounded_512.png build/icon.png

# 清理临时文件
rm -rf temp_icons

echo "图标创建完成！"
echo "生成的文件："
echo "- build/icon.png (512x512 圆角 PNG)"
echo "- build/icon.icns (macOS 图标文件)"
echo "- build/icon.ico (Windows 图标文件)" 