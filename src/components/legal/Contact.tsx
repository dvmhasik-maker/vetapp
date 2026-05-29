import React, { useState } from 'react';
import { ChevronLeft, Mail, MessageCircle, Send, Clock, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Contact: React.FC = () => {
  // --- [설정] 발급받은 Formspree ID를 여기에 입력하세요 ---
  const FORMSPREE_ID = "mdajbbee"; 
  // --------------------------------------------------

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    email: '',
    type: '기능 제안 및 개선',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (FORMSPREE_ID === "YOUR_FORM_ID_HERE") {
      alert("Formspree ID가 설정되지 않았습니다. 개발자에게 문의하세요.");
      return;
    }

    setStatus('sending');

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ email: '', type: '기능 제안 및 개선', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="tool-page">
      <div className="tool-nav">
        <Link to="/" className="back-btn-prominent">
          <ChevronLeft size={18} /> 대시보드
        </Link>
      </div>

      <div className="contact-header">
        <h1>무엇을 도와드릴까요?</h1>
        <p>VETAPP 팀은 여러분의 소중한 의견을 기다리고 있습니다.</p>
      </div>

      <div className="contact-container-grid">
        {/* Contact Form */}
        <div className="tool-card-container contact-form-card">
          <div className="tool-card-title flex items-center gap-2">
            <Send size={18} className="text-blue-500" /> 문의 양식
          </div>
          
          {status === 'success' ? (
            <div className="success-message-area">
              <CheckCircle2 size={48} className="text-green-500 mb-4" />
              <h3>문의가 성공적으로 전송되었습니다!</h3>
              <p>소중한 의견 감사드립니다. 최대한 빨리 확인하여 답변드리겠습니다.</p>
              <button onClick={() => setStatus('idle')} className="btn-back-to-form">새로운 문의 작성</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label>이메일 주소</label>
                <input 
                  type="email" 
                  placeholder="example@email.com" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required 
                  disabled={status === 'sending'}
                />
              </div>
              
              <div className="form-group">
                <label>문의 유형</label>
                <select 
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  disabled={status === 'sending'}
                >
                  <option>기능 제안 및 개선</option>
                  <option>버그 제보</option>
                  <option>데이터 오류 신고</option>
                  <option>광고 및 제휴 문의</option>
                  <option>기타</option>
                </select>
              </div>

              <div className="form-group">
                <label>상세 내용</label>
                <textarea 
                  rows={6} 
                  placeholder="궁금하신 점이나 제안하고 싶은 내용을 자유롭게 작성해 주세요."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                  disabled={status === 'sending'}
                ></textarea>
              </div>

              {status === 'error' && (
                <div className="error-note">
                  <AlertCircle size={16} />
                  <span>전송 중 오류가 발생했습니다. 다시 시도해 주세요.</span>
                </div>
              )}

              <button type="submit" className="submit-btn-refined" disabled={status === 'sending'}>
                {status === 'sending' ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>보내는 중...</span>
                  </>
                ) : (
                  <>
                    <span>문의하기</span>
                    <Send size={18} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Info Sidebar */}
        <div className="contact-info-sidebar">
          <div className="info-card">
            <div className="info-item">
              <div className="info-icon"><Mail size={20} /></div>
              <div className="info-text">
                <label>Direct Email</label>
                <p>support@vetapp.com</p>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon"><MessageCircle size={20} /></div>
              <div className="info-text">
                <label>Channel Talk</label>
                <p>준비 중입니다</p>
              </div>
            </div>
          </div>

          <div className="support-notice">
            <div className="notice-header">
              <Clock size={16} />
              <span>운영 안내</span>
            </div>
            <p>평일 09:00 - 18:00 (KST)</p>
            <p className="mt-2 text-xs opacity-70">문의하신 내용은 영업일 기준 1~3일 이내에 순차적으로 답변드리고 있습니다.</p>
          </div>
        </div>
      </div>

      <style>{`
        .contact-header { text-align: center; padding: 2rem 0 3rem; }
        .contact-header h1 { font-size: 1.75rem; font-weight: 800; color: #0f172a; margin: 0; }
        .contact-header p { color: #64748b; margin-top: 0.5rem; font-weight: 500; }

        .contact-container-grid { display: grid; grid-template-columns: 1fr 300px; gap: 24px; align-items: start; }
        
        .contact-form { display: flex; flex-direction: column; gap: 1.25rem; margin-top: 1rem; }
        .form-group { display: flex; flex-direction: column; gap: 8px; }
        .form-group label { font-size: 0.75rem; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.025em; }
        .form-group input, .form-group select, .form-group textarea {
          padding: 12px 14px; border-radius: 10px; border: 1.5px solid #e2e8f0;
          font-size: 0.95rem; color: #1e293b; outline: none; transition: all 0.2s;
        }
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
          border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        .form-group textarea { resize: none; }

        .submit-btn-refined {
          margin-top: 0.5rem; padding: 16px; border-radius: 12px; border: none;
          background: #0f172a; color: #fff; font-weight: 700; font-size: 1rem;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          cursor: pointer; transition: all 0.2s;
        }
        .submit-btn-refined:hover:not(:disabled) { background: #1e293b; transform: translateY(-1px); }
        .submit-btn-refined:disabled { opacity: 0.7; cursor: not-allowed; }

        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        .success-message-area { text-align: center; padding: 3rem 1rem; }
        .success-message-area h3 { font-size: 1.25rem; font-weight: 800; color: #0f172a; margin-bottom: 0.75rem; }
        .success-message-area p { color: #64748b; font-size: 0.95rem; margin-bottom: 2rem; line-height: 1.6; }
        .btn-back-to-form { padding: 10px 20px; border-radius: 10px; border: 1px solid #e2e8f0; background: #fff; color: #475569; font-weight: 700; cursor: pointer; }

        .error-note { display: flex; align-items: center; gap: 8px; color: #ef4444; font-size: 0.85rem; margin-top: -0.5rem; }

        .info-card { background: #fff; border-radius: 16px; border: 1px solid #e2e8f0; padding: 24px; display: flex; flex-direction: column; gap: 24px; }
        .info-item { display: flex; gap: 16px; align-items: center; }
        .info-icon { width: 44px; height: 44px; border-radius: 12px; background: #f0f7ff; color: #3b82f6; display: flex; align-items: center; justify-content: center; }
        .info-text label { display: block; font-size: 0.65rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; margin-bottom: 2px; }
        .info-text p { font-size: 0.9rem; font-weight: 700; color: #1e293b; margin: 0; }

        .support-notice { margin-top: 16px; background: #f8fafc; border-radius: 12px; padding: 16px; border: 1px solid #e2e8f0; }
        .notice-header { display: flex; align-items: center; gap: 8px; font-size: 0.75rem; font-weight: 800; color: #64748b; margin-bottom: 8px; }
        .support-notice p { font-size: 0.85rem; color: #475569; margin: 0; line-height: 1.5; }

        @media (max-width: 900px) {
          .contact-container-grid { grid-template-columns: 1fr; }
          .contact-info-sidebar { order: -1; }
        }
      `}</style>
    </div>
  );
};

export default Contact;
