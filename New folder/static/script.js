/* ══════════════════════════════════════════════════════════════
   FinQuest — JavaScript
   ══════════════════════════════════════════════════════════════ */

/* ── Flowchart (Map Page) ─────────────────────────────────── */
function initFlowchart() {
    const nodes = document.querySelectorAll('.flow-node');
    const svg = document.getElementById('flowchart-svg');
    const indicator = document.getElementById('position-indicator');

    if (!nodes.length || !svg) return;

    // Wait for layout to settle
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            drawConnections(nodes, svg);
            positionIndicator(nodes, indicator);
        });
    });

    // Redraw on resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            drawConnections(nodes, svg);
            positionIndicator(nodes, indicator);
        }, 200);
    });
}

function drawConnections(nodes, svg) {
    const container = svg.parentElement;
    const containerRect = container.getBoundingClientRect();

    // Clear existing
    svg.innerHTML = '';

    // Set SVG size
    svg.setAttribute('width', containerRect.width);
    svg.setAttribute('height', containerRect.height);
    svg.style.width = containerRect.width + 'px';
    svg.style.height = containerRect.height + 'px';

    // Create gradient definitions
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');

    // Add score gradient for quiz page
    const scoreGrad = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    scoreGrad.setAttribute('id', 'scoreGradient');
    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('stop-color', '#3b82f6');
    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '100%');
    stop2.setAttribute('stop-color', '#10b981');
    scoreGrad.appendChild(stop1);
    scoreGrad.appendChild(stop2);
    defs.appendChild(scoreGrad);

    svg.appendChild(defs);

    // Draw lines between consecutive nodes
    for (let i = 0; i < nodes.length - 1; i++) {
        const nodeA = nodes[i];
        const nodeB = nodes[i + 1];

        const rectA = nodeA.getBoundingClientRect();
        const rectB = nodeB.getBoundingClientRect();

        // Calculate center-bottom of A and center-top of B relative to container
        const ax = rectA.left + rectA.width / 2 - containerRect.left;
        const ay = rectA.top + rectA.height - containerRect.top;
        const bx = rectB.left + rectB.width / 2 - containerRect.left;
        const by = rectB.top - containerRect.top;

        // Determine state for line color
        const stateA = nodeA.dataset.state;
        const stateB = nodeB.dataset.state;

        let lineColor, lineOpacity, lineWidth;
        if (stateA === 'completed' && (stateB === 'completed' || stateB === 'current')) {
            lineColor = '#10b981';
            lineOpacity = 0.8;
            lineWidth = 3;
        } else if (stateA === 'completed' || stateA === 'current') {
            lineColor = '#3b82f6';
            lineOpacity = 0.5;
            lineWidth = 2.5;
        } else {
            lineColor = '#334155';
            lineOpacity = 0.3;
            lineWidth = 2;
        }

        // Draw a smooth bezier curve
        const midY = (ay + by) / 2;
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const d = `M ${ax} ${ay} C ${ax} ${midY}, ${bx} ${midY}, ${bx} ${by}`;
        path.setAttribute('d', d);
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', lineColor);
        path.setAttribute('stroke-width', lineWidth);
        path.setAttribute('stroke-opacity', lineOpacity);
        path.setAttribute('stroke-linecap', 'round');

        // Add dashed pattern for locked paths
        if (stateA === 'locked' || stateB === 'locked') {
            path.setAttribute('stroke-dasharray', '8 6');
        }

        // Animate path drawing
        const pathLength = estimatePathLength(ax, ay, bx, by);
        path.style.strokeDasharray = pathLength;
        path.style.strokeDashoffset = pathLength;
        path.style.transition = `stroke-dashoffset 0.8s ease ${i * 0.15}s`;

        svg.appendChild(path);

        // Trigger animation
        requestAnimationFrame(() => {
            path.style.strokeDashoffset = '0';
        });

        // Add glow effect for completed paths
        if (stateA === 'completed') {
            const glowPath = path.cloneNode();
            glowPath.setAttribute('stroke-width', lineWidth + 4);
            glowPath.setAttribute('stroke-opacity', 0.15);
            glowPath.setAttribute('filter', 'blur(4px)');
            glowPath.style.strokeDasharray = pathLength;
            glowPath.style.strokeDashoffset = pathLength;
            glowPath.style.transition = `stroke-dashoffset 0.8s ease ${i * 0.15}s`;
            svg.insertBefore(glowPath, path);
            requestAnimationFrame(() => {
                glowPath.style.strokeDashoffset = '0';
            });
        }
    }
}

function estimatePathLength(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy) * 1.3;
}

function positionIndicator(nodes, indicator) {
    if (!indicator) return;

    const container = indicator.parentElement;
    const containerRect = container.getBoundingClientRect();

    // Find the current node
    let currentNode = null;
    for (const node of nodes) {
        if (node.dataset.state === 'current') {
            currentNode = node;
            break;
        }
    }

    // If no current (all complete), put indicator at the end
    if (!currentNode) {
        const lastNode = nodes[nodes.length - 1];
        if (lastNode && lastNode.dataset.state === 'completed') {
            currentNode = lastNode;
        } else {
            indicator.style.display = 'none';
            return;
        }
    }

    const rect = currentNode.getBoundingClientRect();
    const x = rect.left + rect.width / 2 - containerRect.left;
    const y = rect.top - containerRect.top - 8;

    indicator.style.left = x + 'px';
    indicator.style.top = y + 'px';
    indicator.style.display = 'block';
}


/* ── Quiz Logic ───────────────────────────────────────────── */
function selectAnswer(qIndex, optIndex) {
    // Prevent double answering
    if (typeof answeredQuestions !== 'undefined' && answeredQuestions.has(qIndex)) return;
    answeredQuestions.add(qIndex);

    const topicId = typeof TOPIC_ID !== 'undefined' ? TOPIC_ID : '';
    const totalQ = typeof TOTAL_QUESTIONS !== 'undefined' ? TOTAL_QUESTIONS : 5;

    // Send to server
    fetch('/check_answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            topic_id: topicId,
            question_index: qIndex,
            selected: optIndex
        })
    })
    .then(res => res.json())
    .then(data => {
        const card = document.getElementById(`question-${qIndex}`);
        const buttons = card.querySelectorAll('.option-btn');

        // Mark correct / wrong
        buttons.forEach((btn, i) => {
            if (i === data.correct_index) {
                btn.classList.add('option-correct');
            } else if (i === optIndex && !data.correct) {
                btn.classList.add('option-wrong');
            }
            if (i !== data.correct_index && i !== optIndex) {
                btn.classList.add('option-disabled');
            }
            btn.style.pointerEvents = 'none';
        });

        // Show explanation
        const expBox = document.getElementById(`explanation-${qIndex}`);
        if (expBox) expBox.style.display = 'flex';

        // Show next button
        const nextBtn = document.getElementById(`next-${qIndex}`);
        if (nextBtn) nextBtn.style.display = 'inline-flex';

        // Update score
        if (data.correct) {
            currentScore = data.score;
        }
    })
    .catch(err => console.error('Error checking answer:', err));
}

function nextQuestion(currentQ) {
    const totalQ = typeof TOTAL_QUESTIONS !== 'undefined' ? TOTAL_QUESTIONS : 5;
    const topicId = typeof TOPIC_ID !== 'undefined' ? TOPIC_ID : '';

    if (currentQ >= totalQ - 1) {
        // Last question — complete the topic
        completeTopic(topicId);
        return;
    }

    // Hide current, show next
    const currentCard = document.getElementById(`question-${currentQ}`);
    const nextCard = document.getElementById(`question-${currentQ + 1}`);

    currentCard.style.display = 'none';
    nextCard.style.display = 'block';

    // Update progress bar
    const progress = ((currentQ + 2) / totalQ) * 100;
    const fill = document.getElementById('quiz-progress-fill');
    const text = document.getElementById('quiz-progress-text');
    if (fill) fill.style.width = progress + '%';
    if (text) text.textContent = `Question ${currentQ + 2} of ${totalQ}`;
}

function completeTopic(topicId) {
    fetch('/complete_topic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic_id: topicId })
    })
    .then(res => res.json())
    .then(data => {
        showScoreOverlay(data);
    })
    .catch(err => console.error('Error completing topic:', err));
}

function showScoreOverlay(data) {
    const overlay = document.getElementById('score-overlay');
    if (!overlay) return;

    const score = typeof currentScore !== 'undefined' ? currentScore : 0;
    const total = typeof TOTAL_QUESTIONS !== 'undefined' ? TOTAL_QUESTIONS : 5;
    const pct = score / total;

    // Update elements
    document.getElementById('score-value').textContent = `${score}/${total}`;

    const emoji = document.getElementById('score-emoji');
    const title = document.getElementById('score-title');
    const msg = document.getElementById('score-message');

    if (pct >= 0.8) {
        emoji.textContent = '🎉';
        title.textContent = 'Excellent!';
        msg.textContent = 'Outstanding performance! You really know your stuff.';
    } else if (pct >= 0.6) {
        emoji.textContent = '👏';
        title.textContent = 'Good Job!';
        msg.textContent = 'Solid knowledge! Keep learning to master this topic.';
    } else {
        emoji.textContent = '💪';
        title.textContent = 'Keep Learning!';
        msg.textContent = "Don't worry — every expert was once a beginner. Review and try again!";
    }

    // Check if all 8 topics are done
    if (data.completed && data.completed.length >= 8) {
        const btn = document.getElementById('btn-continue');
        btn.href = '/complete';
        btn.textContent = '🏆 View Final Results →';
    }

    // Show overlay
    overlay.style.display = 'flex';

    // Animate ring
    setTimeout(() => {
        const ring = document.getElementById('score-ring-fill');
        if (ring) {
            const circumference = 2 * Math.PI * 52; // r=52
            ring.style.strokeDasharray = `${pct * circumference} ${circumference}`;
        }
    }, 300);
}


/* ── Page Load Animations ─────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
    // Stagger animate flow nodes
    const flowNodes = document.querySelectorAll('.flow-node');
    flowNodes.forEach((node, i) => {
        node.style.opacity = '0';
        node.style.transform = 'translateY(20px)';
        node.style.transition = `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`;
        requestAnimationFrame(() => {
            node.style.opacity = '';
            node.style.transform = '';
        });
    });

    // Animate hero floating cards
    const floatCards = document.querySelectorAll('.float-card');
    floatCards.forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform += ' scale(0.9)';
        setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = card.style.transform.replace('scale(0.9)', 'scale(1)');
        }, 300 + i * 100);
    });
});
