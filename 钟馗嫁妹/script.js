// 卡牌数据
const cardData = [
    {
        id: 1,
        image: '1.jpg',
        title: '终南雾锁',
        content: '终南雾锁茅檐低，寒梅泣露听别离。'
    },
    {
        id: 2,
        image: '2.jpg',
        title: '杜平解囊',
        content: '杜平解囊诺相许：功名若就，以妹为妻。'
    },
    {
        id: 3,
        image: '3.jpg',
        title: '误入鬼门',
        content: '荒途误入鬼门关，磷火缠骨蚀朱颜。昔日少年貌，化作夜叉面。'
    },
    {
        id: 4,
        image: '4.jpg',
        title: '殿试夺魁',
        content: '殿试夺魁龙颜怒，"貌丑欺君"断仕途。'
    },
    {
        id: 5,
        image: '5.jpg',
        title: '含恨撞阶',
        content: '含恨撞阶魂归处，血溅宫阶草木枯。'
    },
    {
        id: 6,
        image: '6.jpg',
        title: '阴司大闹',
        content: '阴司大闹不平声，玉帝赐剑封鬼名。'
    },
    {
        id: 7,
        image: '7.jpg',
        title: '护佑苍生',
        content: '从此阴阳为疆界，斩尽妖祟护苍生。'
    },
    {
        id: 8,
        image: '8.jpg',
        title: '杜平情义',
        content: '杜平情义暖黄泉，媚儿孤影泪偷弹。'
    },
    {
        id: 9,
        image: '9.jpg',
        title: '千里负骨',
        content: '千里负骨归终南，荒冢孤碑雨潺潺。'
    },
    {
        id: 10,
        image: '10.jpg',
        title: '除夕鬼轿',
        content: '除夕冷雾锁人间，鬼兵抬轿过荒滩。'
    },
    {
        id: 11,
        image: '11.jpg',
        title: '魂归旧舍',
        content: '鼓乐声幽惊宿鸟，魂归旧舍续前缘。'
    },
    {
        id: 12,
        image: '12.jpg',
        title: '鬼手描眉',
        content: '鬼手为妹描黛眉，珠花压鬓泪暗垂。'
    },
    {
        id: 13,
        image: '13.jpg',
        title: '赠剑护妹',
        content: '赠君斩鬼青铜剑，护她岁岁免邪祟。'
    },
    {
        id: 14,
        image: '14.jpg',
        title: '杜平相迎',
        content: '杜平凝重相迎。'
    },
    {
        id: 15,
        image: '15.jpg',
        title: '媚儿出轿',
        content: '媚儿出花轿。'
    },
    {
        id: 16,
        image: '16.jpg',
        title: '拜堂化雾',
        content: '拜堂声里笑三声，挥袖化雾入幽冥。从此阴阳两相隔，斩鬼除祟不留名。'
    },
    {
        id: 17,
        image: '17.jpg',
        title: '一诺兑现',
        content: '昔日一诺终兑现，情义惊破鬼门关。'
    },
    {
        id: 18,
        image: '18.jpg',
        title: '千古传扬',
        content: '终南云海藏鬼眼，正气贯破阴阳关。情义驱邪千古传，聊斋诡话留人间。'
    }
];

// DOM元素
const cardContainer = document.querySelector('.card-container');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalContent = document.getElementById('modal-content');
const closeBtn = document.querySelector('.close');

// 生成卡牌
function generateCards() {
    cardData.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.id = card.id;
        
        cardElement.innerHTML = `
            <div class="card-inner">
                <div class="card-front">
                    <img src="${card.image}" alt="${card.title}">
                </div>
                <div class="card-back">
                    <div class="card-title">${card.title}</div>
                </div>
            </div>
        `;
        
        cardContainer.appendChild(cardElement);
        
        // 添加点击事件
        cardElement.addEventListener('click', handleCardClick);
    });
}

// 处理卡牌点击
function handleCardClick(e) {
    const card = e.currentTarget;
    
    // 如果卡牌已经翻转（显示背面），则显示图片2秒后打开弹窗
    if (card.classList.contains('flipped')) {
        const cardId = parseInt(card.dataset.id);
        const cardInfo = cardData.find(c => c.id === cardId);
        
        if (cardInfo) {
            // 创建临时图片元素
            const tempImage = document.createElement('div');
            tempImage.style.position = 'fixed';
            tempImage.style.top = '50%';
            tempImage.style.left = '50%';
            tempImage.style.transform = 'translate(-50%, -50%)';
            tempImage.style.zIndex = '2000';
            tempImage.style.width = '60%';
            tempImage.style.maxWidth = '800px';
            tempImage.style.height = 'auto';
            tempImage.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.5)';
            tempImage.style.borderRadius = '10px';
            tempImage.style.animation = 'imageFadeIn 0.5s ease-out forwards';
            tempImage.innerHTML = `<img src="${cardInfo.image}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;">`;
            
            // 添加到页面
            document.body.appendChild(tempImage);
            
            // 2秒后移除图片并打开弹窗
            setTimeout(() => {
                tempImage.style.animation = 'imageFadeOut 0.5s ease-in forwards';
                
                // 动画结束后移除元素并打开弹窗
                setTimeout(() => {
                    document.body.removeChild(tempImage);
                    
                    // 先隐藏弹窗内容，移除动画效果
                    modalTitle.style.opacity = '0';
                    modalContent.style.opacity = '0';
                    
                    // 设置弹窗内容
                    modalTitle.textContent = cardInfo.title;
                    modalContent.textContent = cardInfo.content;
                    
                    // 显示弹窗
                    modal.style.display = 'block';
                    
                    // 强制重排，然后重新触发动画
                    setTimeout(() => {
                        modalTitle.style.animation = 'none';
                        modalContent.style.animation = 'none';
                        void modalTitle.offsetWidth; // 触发重排
                        modalTitle.style.animation = 'textFadeIn 1s ease-out forwards';
                        modalContent.style.animation = 'textFadeIn 1s ease-out 0.3s forwards';
                    }, 10);
                }, 500);
            }, 2000);
        }
    } else {
        // 否则翻转卡牌
        card.classList.add('flipped');
    }
}

// 关闭弹窗
function closeModal() {
    modal.style.display = 'none';
    
    // 找到所有翻转的卡牌，将它们翻转回正面
    const flippedCards = document.querySelectorAll('.card.flipped');
    flippedCards.forEach(card => {
        card.classList.remove('flipped');
    });
}

// 点击关闭按钮关闭弹窗
closeBtn.addEventListener('click', closeModal);

// 点击弹窗外部关闭弹窗
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// 初始化
window.addEventListener('DOMContentLoaded', generateCards);