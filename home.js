(function() {
    // 动态问候语（根据小时）
    const hour = new Date().getHours();
    let greeting = '';
    if (hour < 11) greeting = '早上';
    else if (hour < 14) greeting = '中午';
    else if (hour < 18) greeting = '下午';
    else greeting = '晚上';
    const welcomeEl = document.querySelector('.welcome-text h2');
    if (welcomeEl) {
        welcomeEl.innerHTML = `${greeting}好, 乐乐妈妈 🌷`;
    }

    // 消息通知点击 (模拟轻提示)
    const bell = document.getElementById('messageBell');
    const badge = document.getElementById('notifBadge');
    bell.addEventListener('click', function(e) {
        e.preventDefault();
        alert('📬 您有3条未读消息：2条社区回复，1条咨询回复。');
        // 可选将小红点消除(演示交互)
        badge.style.backgroundColor = '#d0a5b0';
        badge.textContent = '0';
    });

    // 快速卡片点击统一提示 (因为无跳转)
    const cards = document.querySelectorAll('.quick-card, .rec-card .btn-ghost, .stat-item');
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.btn-ghost') || e.target.closest('.quick-card')) {
                e.preventDefault();
                const text = e.target.closest('.quick-card')?.querySelector('span')?.innerText 
                            || e.target.closest('.btn-ghost')?.innerText 
                            || '功能';
                alert(`✨ 您点击了「${text}」模块。正式版本将跳转到对应页面。`);
            }
        });
    });

    // 底部链接提示
    document.querySelectorAll('.footer-links span').forEach(link => {
        link.addEventListener('click', () => alert('此为基础演示，正式版会跳转至对应说明页。'));
    });

    // 个人中心点击提示
    document.querySelector('.user-profile').addEventListener('click', () => alert('个人中心 · 资料/设置/记录'));
})();