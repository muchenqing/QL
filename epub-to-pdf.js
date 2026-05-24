const fs = require('fs');
const path = require('path');
const Epub = require('epub');
const PDFDocument = require('pdfkit');
const cheerio = require('cheerio');

function epubToPdf(epubPath, outputPath) {
  return new Promise((resolve, reject) => {
    try {
      const epub = new Epub(epubPath);
      
      epub.on('error', (err) => {
        reject(err);
      });
      
      epub.on('end', () => {
        const doc = new PDFDocument();
        const writeStream = fs.createWriteStream(outputPath);
        
        doc.pipe(writeStream);
        
        // 设置标题
        doc.fontSize(24).text(epub.metadata.title || 'Unknown Title', { align: 'center' });
        doc.moveDown();
        
        // 设置作者
        if (epub.metadata.creator) {
          doc.fontSize(16).text(`作者: ${epub.metadata.creator}`, { align: 'center' });
          doc.moveDown();
        }
        
        doc.moveDown();
        
        // 遍历章节
        epub.flow.forEach((chapter, index) => {
          const chapterContent = epub.getChapter(chapter.id);
          if (chapterContent) {
            const $ = cheerio.load(chapterContent);
            
            // 提取标题
            const chapterTitle = $('h1, h2, h3').first().text() || `Chapter ${index + 1}`;
            doc.fontSize(18).text(chapterTitle, { underline: true });
            doc.moveDown();
            
            // 提取正文
            $('p').each((i, p) => {
              const text = $(p).text().trim();
              if (text) {
                doc.fontSize(12).text(text);
                doc.moveDown(0.5);
              }
            });
            
            doc.addPage();
          }
        });
        
        doc.end();
        
        writeStream.on('finish', () => {
          resolve(`转换完成: ${outputPath}`);
        });
        
        writeStream.on('error', (err) => {
          reject(err);
        });
      });
      
      epub.parse();
    } catch (error) {
      reject(error);
    }
  });
}

// 命令行参数处理
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length !== 2) {
    console.error('使用方法: node epub-to-pdf.js <epub文件路径> <输出pdf文件路径>');
    process.exit(1);
  }
  
  const [epubPath, outputPath] = args;
  
  if (!fs.existsSync(epubPath)) {
    console.error(`错误: epub文件不存在: ${epubPath}`);
    process.exit(1);
  }
  
  console.log(`开始转换: ${epubPath} -> ${outputPath}`);
  
  epubToPdf(epubPath, outputPath)
    .then((message) => {
      console.log(message);
    })
    .catch((error) => {
      console.error('转换失败:', error);
    });
}

module.exports = epubToPdf;