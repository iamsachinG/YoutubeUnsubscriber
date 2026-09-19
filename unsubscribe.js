(async function() {
    const sleep = ms => new Promise(res => setTimeout(res, ms));
    let totalUnsubbed = 0;

    console.log("🚀 Starting Auto-Unsubscriber (With Smart Polling)...");

    
    function safeClick(element) {
        if (!element) return;
        const actualButton = element.tagName.toLowerCase() === 'button' ? element : (element.querySelector('button') || element);
        actualButton.click();
    }

    // Smart Wait: Checks the screen every 100ms for an element instead of blind guessing
    async function waitForVisibleElement(selector, textMatch, timeout = 3000) {
        const start = Date.now();
        while (Date.now() - start < timeout) {
            const elements = Array.from(document.querySelectorAll(selector));
            const target = elements.find(el => {
                const text = (el.innerText || el.textContent || '').trim();
                // offsetParent ensures the element is physically painted on the screen
                const isVisible = el.getBoundingClientRect().width > 0 && el.offsetParent !== null;
                return isVisible && (text === textMatch || textMatch === '');
            });
            if (target) return target;
            await sleep(100);
        }
        return null; // Timed out
    }

    while (true) {
        
        const buttons = Array.from(document.querySelectorAll('ytd-subscribe-button-renderer, yt-button-shape'))
            .filter(btn => {
                const text = (btn.innerText || '').trim();
                const isVisible = btn.getBoundingClientRect().width > 0 && btn.offsetParent !== null;
                const notSkipped = !btn.hasAttribute('data-skip');
                return isVisible && notSkipped && text.includes('Subscribed');
            });

        if (buttons.length === 0) {
            console.log("🔄 Scrolling down to load more...");
            const prevHeight = document.documentElement.scrollHeight;
            window.scrollTo(0, prevHeight);
            await sleep(3000); 
            
            if (document.documentElement.scrollHeight === prevHeight) {
                console.log(`✅ Finished! Total unsubscribed: ${totalUnsubbed}`);
                break;
            }
            continue; 
        }

        const targetBtn = buttons[0]; 
        targetBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
        await sleep(500); 

        try {
            console.log("Step 1: Clicking 'Subscribed' button...");
            safeClick(targetBtn);
            
            
            const unsubMenuItem = await waitForVisibleElement('ytd-menu-service-item-renderer, tp-yt-paper-item', 'Unsubscribe', 3000);

            if (unsubMenuItem) {
                console.log("Step 2: Clicking 'Unsubscribe' from dropdown...");
                safeClick(unsubMenuItem);
                
                
                const confirmDialog = await waitForVisibleElement('yt-confirm-dialog-renderer', '', 3000);
                
                if (confirmDialog) {
                    let finalBtn = confirmDialog.querySelector('#confirm-button');
                    if (!finalBtn) {
                        finalBtn = Array.from(confirmDialog.querySelectorAll('yt-button-shape, button'))
                                        .find(b => (b.innerText || '').trim() === 'Unsubscribe');
                    }

                    if (finalBtn) {
                        console.log("Step 3: Clicking final confirmation...");
                        safeClick(finalBtn);
                        totalUnsubbed++;
                        await sleep(1000); // Let YouTube server process it before moving to the next
                    } else {
                        console.log("⚠️ Could not find confirm button. Skipping.");
                        targetBtn.setAttribute('data-skip', 'true');
                        document.body.click(); 
                    }
                } else {
                    console.log("✅ Unsubscribed directly without popup.");
                    totalUnsubbed++;
                    await sleep(1000);
                }
            } else {
                console.log("⚠️ Dropdown didn't appear. Skipping fake button.");
                targetBtn.setAttribute('data-skip', 'true');
                document.body.click(); 
                await sleep(500);
            }
        } catch (err) {
            console.error("❌ Error processing channel.", err);
            targetBtn.setAttribute('data-skip', 'true');
            document.body.click();
        }
    }
})();
