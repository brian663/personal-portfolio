import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  ArrowLeft,
  Mail,
  MailOpen,
  Trash2,
  Eye,
  X,
  Clock,
  User,
  MessageSquare,
} from "lucide-react";
import {
  markMessageRead,
  removeMessage,
  subscribeToMessages,
} from "../../services/messageService.js";

function ManageMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => subscribeToMessages(setMessages), []);

  const [selectedMessage, setSelectedMessage] = useState(null);

  /* =========================================================
     OPEN MESSAGE
  ========================================================= */

  const openMessage = (message) => {
    setSelectedMessage(message);

    markMessageRead(message.id, true).catch((error) =>
      alert(`Unable to mark message as read: ${error.message}`),
    );
  };

  /* =========================================================
     CLOSE MESSAGE
  ========================================================= */

  const closeMessage = () => {
    setSelectedMessage(null);
  };

  /* =========================================================
     DELETE MESSAGE
  ========================================================= */

  const deleteMessage = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this message?",
    );

    if (!confirmed) return;

    try {
      await removeMessage(id);

      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    } catch (error) {
      alert(`Unable to delete message: ${error.message}`);
    }
  };

  /* =========================================================
     MARK AS UNREAD
  ========================================================= */

  const markUnread = (id) => {
    markMessageRead(id, false).catch((error) =>
      alert(`Unable to mark message as unread: ${error.message}`),
    );
  };

  const unreadCount = messages.filter((message) => !message.read).length;

  return (
    <div className="admin-page">
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <header className="admin-page-header">
        <div className="admin-page-title">
          <div className="admin-title-icon">
            <Mail size={22} />
          </div>

          <div>
            <h1>Messages</h1>

            <p>View and manage messages sent through your portfolio.</p>
          </div>
        </div>

        <Link to="/admin" className="back-dashboard-btn">
          <ArrowLeft size={16} />
          Dashboard
        </Link>
      </header>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main className="admin-section">
        <div className="message-summary">
          <div className="message-summary-card">
            <div className="message-summary-icon">
              <Mail size={21} />
            </div>

            <div>
              <strong>{messages.length}</strong>
              <span>Total Messages</span>
            </div>
          </div>

          <div className="message-summary-card">
            <div className="message-summary-icon">
              <MailOpen size={21} />
            </div>

            <div>
              <strong>{unreadCount}</strong>
              <span>Unread Messages</span>
            </div>
          </div>
        </div>

        {/* ===================================================
            MESSAGE HEADER
        =================================================== */}

        <div className="management-toolbar">
          <div>
            <h2>Inbox</h2>

            <p>Messages received from your portfolio contact form.</p>
          </div>
        </div>

        {/* ===================================================
            EMPTY STATE
        =================================================== */}

        {messages.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">
              <MessageSquare size={28} />
            </div>

            <h3>No Messages</h3>

            <p>
              Messages submitted through your portfolio contact form will appear
              here.
            </p>
          </div>
        ) : (
          /* =================================================
             MESSAGE LIST
          ================================================= */

          <div className="message-list">
            {messages.map((message) => (
              <article
                key={message.id}
                className={`message-card ${
                  !message.read ? "message-unread" : ""
                }`}
              >
                <div className="message-icon">
                  {message.read ? <MailOpen size={21} /> : <Mail size={21} />}
                </div>

                <div className="message-main">
                  <div className="message-top">
                    <div>
                      <h3>{message.subject}</h3>

                      <p className="message-sender">
                        <User size={14} />
                        {message.name}
                        <span>•</span>
                        {message.email}
                      </p>
                    </div>

                    {!message.read && <span className="unread-badge">New</span>}
                  </div>

                  <p className="message-preview">{message.message}</p>

                  <div className="message-footer">
                    <span className="message-date">
                      <Clock size={13} />
                      {message.date} · {message.time}
                    </span>

                    <div className="message-actions">
                      <button
                        className="message-view-btn"
                        onClick={() => openMessage(message)}
                      >
                        <Eye size={14} />
                        View
                      </button>

                      {message.read && (
                        <button
                          className="message-unread-btn"
                          onClick={() => markUnread(message.id)}
                        >
                          <Mail size={14} />
                          Mark Unread
                        </button>
                      )}

                      <button
                        className="message-delete-btn"
                        onClick={() => deleteMessage(message.id)}
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* =====================================================
            MESSAGE MODAL
        ===================================================== */}

        {selectedMessage && (
          <div className="admin-modal-overlay" onClick={closeMessage}>
            <div
              className="admin-modal message-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="admin-modal-header">
                <div>
                  <h2>{selectedMessage.subject}</h2>

                  <p>Message details</p>
                </div>

                <button className="modal-close-btn" onClick={closeMessage}>
                  <X size={18} />
                </button>
              </div>

              {/* SENDER */}

              <div className="message-detail">
                <div className="message-detail-icon">
                  <User size={20} />
                </div>

                <div>
                  <span>From</span>

                  <strong>{selectedMessage.name}</strong>

                  <p>{selectedMessage.email}</p>
                </div>
              </div>

              {/* DATE */}

              <div className="message-detail">
                <div className="message-detail-icon">
                  <Clock size={20} />
                </div>

                <div>
                  <span>Received</span>

                  <strong>{selectedMessage.date}</strong>

                  <p>{selectedMessage.time}</p>
                </div>
              </div>

              {/* MESSAGE */}

              <div className="message-content">
                <div className="message-content-heading">
                  <MessageSquare size={17} />
                  <span>Message</span>
                </div>

                <p>{selectedMessage.message}</p>
              </div>

              <div className="message-modal-actions">
                <button className="secondary-btn" onClick={closeMessage}>
                  Close
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteMessage(selectedMessage.id)}
                >
                  <Trash2 size={15} />
                  Delete Message
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default ManageMessages;
