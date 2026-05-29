import React from 'react';
import { ChevronLeft, Mail, MessageSquare, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

const Contact: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('문의가 접수되었습니다. (데모 환경에서는 실제 전송되지 않습니다)');
  };

  return (
    <div className="tool-page">
      <div className="tool-nav">
        <Link to="/" className="back-btn-prominent">
          <ChevronLeft size={18} /> 대시보드
        </Link>
      </div>

      <div className="tool-card-container">
        <div className="tool-card-title flex items-center gap-2">
          <Mail size={20} className="text-blue-500" /> 문의하기
        </div>
        
        <p className="text-slate-600 mb-6 text-sm">
          서비스 이용 중 버그 제보, 기능 제안, 또는 기타 문의사항이 있으시면 아래 양식을 통해 보내주세요. 
          보내주신 의견은 서비스 발전에 큰 힘이 됩니다.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="pf">
            <label className="text-xs font-bold text-slate-500 uppercase">이메일 주소</label>
            <input type="email" placeholder="email@example.com" className="input-field-food" required />
          </div>
          
          <div className="pf">
            <label className="text-xs font-bold text-slate-500 uppercase">문의 유형</label>
            <select className="select-field-food">
              <option>버그 제보</option>
              <option>새로운 기능 제안</option>
              <option>데이터 오류 신고</option>
              <option>기타</option>
            </select>
          </div>

          <div className="pf">
            <label className="text-xs font-bold text-slate-500 uppercase">내용</label>
            <textarea 
              rows={5} 
              placeholder="자세한 내용을 입력해 주세요." 
              className="input-field-food"
              style={{ resize: 'none' }}
              required
            ></textarea>
          </div>

          <button type="submit" className="btn-calculate-food">
            <Send size={18} /> 메시지 보내기
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100">
          <div className="flex items-start gap-3 text-slate-500 text-sm">
            <MessageSquare size={18} className="mt-1" />
            <div>
              <p className="font-bold text-slate-700">이메일 직접 문의</p>
              <p>support@vetapp.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
