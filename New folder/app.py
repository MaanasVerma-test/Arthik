"""
Financial Literacy Quiz Game — Flask Application
"""
from flask import Flask, render_template, session, request, jsonify, redirect, url_for
from quiz_data import TOPICS, QUESTIONS
import secrets

app = Flask(__name__)
app.secret_key = secrets.token_hex(32)


def get_progress():
    """Return session progress or initialize it."""
    if "progress" not in session:
        session["progress"] = {
            "completed": [],        # list of completed topic ids
            "current_topic": None,
            "current_q": 0,         # 0-indexed question number within current topic
            "scores": {},           # topic_id -> score (out of 5)
            "total_score": 0,
        }
    return session["progress"]


@app.route("/")
def home():
    return render_template("home.html")


@app.route("/map")
def game_map():
    progress = get_progress()
    completed = progress["completed"]

    topic_states = []
    for i, topic in enumerate(TOPICS):
        if topic["id"] in completed:
            state = "completed"
        elif i == 0 and len(completed) == 0:
            state = "current"
        elif i > 0 and TOPICS[i - 1]["id"] in completed and topic["id"] not in completed:
            state = "current"
        else:
            state = "locked"
        topic_states.append({**topic, "state": state, "index": i})

    return render_template("map.html", topics=topic_states, progress=progress)


@app.route("/quiz/<topic_id>")
def quiz(topic_id):
    progress = get_progress()

    # Validate topic exists
    valid_ids = [t["id"] for t in TOPICS]
    if topic_id not in valid_ids:
        return redirect(url_for("game_map"))

    # Check topic is unlocked
    idx = valid_ids.index(topic_id)
    if idx > 0 and TOPICS[idx - 1]["id"] not in progress["completed"]:
        return redirect(url_for("game_map"))
    if topic_id in progress["completed"]:
        return redirect(url_for("game_map"))

    # Set current topic
    progress["current_topic"] = topic_id
    progress["current_q"] = 0
    session["progress"] = progress
    session.modified = True

    topic_info = TOPICS[idx]
    questions = QUESTIONS[topic_id]

    return render_template("quiz.html", topic=topic_info, questions=questions, total=len(questions))


@app.route("/check_answer", methods=["POST"])
def check_answer():
    data = request.get_json()
    topic_id = data.get("topic_id")
    q_index = data.get("question_index")
    selected = data.get("selected")

    if topic_id not in QUESTIONS or q_index >= len(QUESTIONS[topic_id]):
        return jsonify({"error": "Invalid question"}), 400

    question = QUESTIONS[topic_id][q_index]
    correct = question["correct"]
    is_correct = selected == correct

    progress = get_progress()

    # Initialize score tracker
    if topic_id not in progress["scores"]:
        progress["scores"][topic_id] = 0

    if is_correct:
        progress["scores"][topic_id] += 1
        progress["total_score"] += 1

    progress["current_q"] = q_index + 1
    session["progress"] = progress
    session.modified = True

    return jsonify({
        "correct": is_correct,
        "correct_index": correct,
        "explanation": question["explanation"],
        "score": progress["scores"][topic_id],
    })


@app.route("/complete_topic", methods=["POST"])
def complete_topic():
    data = request.get_json()
    topic_id = data.get("topic_id")

    progress = get_progress()
    if topic_id not in progress["completed"]:
        progress["completed"].append(topic_id)
    progress["current_topic"] = None
    progress["current_q"] = 0
    session["progress"] = progress
    session.modified = True

    return jsonify({"success": True, "completed": progress["completed"], "scores": progress["scores"]})


@app.route("/complete")
def complete():
    progress = get_progress()
    topic_scores = []
    for t in TOPICS:
        topic_scores.append({
            "name": t["name"],
            "icon": t["icon"],
            "color": t["color"],
            "score": progress["scores"].get(t["id"], 0),
            "total": 5
        })
    total = progress["total_score"]
    return render_template("complete.html", topic_scores=topic_scores, total=total, max_total=40)


@app.route("/reset")
def reset():
    session.clear()
    return redirect(url_for("home"))


if __name__ == "__main__":
    app.run(debug=True, port=5000)
