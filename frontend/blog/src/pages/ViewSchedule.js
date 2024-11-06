import React, { useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import './nav_schedule.css';
import { useNavigate } from 'react-router-dom'; // useNavigate 임포트
import eventsData from './data/event.json'; // src 경로에서 파일을 import
export default function ViewSchedule() {
  const calendarEl = useRef(null);
  const navigate = useNavigate(); // 여기에 useNavigate 호출

  useEffect(() => {
    if (calendarEl.current) {
      const calendarApi = calendarEl.current.getApi();
      console.log('Calendar API loaded:', calendarApi);
    }
  }, []);

  const fetchEvents = (fetchInfo, successCallback, failureCallback) => {
    try {
      const events = eventsData.map(event => ({
        title: event.name,
        start: event.startTime,
        end: event.endTime,
      }));
  
      successCallback(events);
    } catch (error) {
      console.error('Failed to load events:', error);
      failureCallback(error);
    }
  };
  
return (
    <>
      {/* 네비게이션 바 */}
      <header className="navbar">
        <div className="logo_home">ShiftMate</div>
        <nav>
          <ul className="nav-links">
            <li><button className="main-button" onClick={() => { window.location.href = '/home'; }}>홈</button></li>
            <li><button className="main-button" onClick={() => navigate('/create')}>근무표 생성</button></li>
            <li><button className="main-button" onClick={() => navigate('/write')}>근무표 작성</button></li>
            <li><button className="main-button" onClick={() => navigate('/view')}>근무표 조회</button></li>
          </ul>
        </nav>
        <div className="auth-buttons">
          <button onClick={() => navigate('/login')}>로그인</button>
            <button onClick={() => navigate('/signup')}>회원가입</button>
        </div>
      </header>
      {/* 메인 컨텐츠 */}
      <div style={{ height: '80vh', width: '90vw', margin: '0 auto' }}>
        <div
          style={{
            textAlign: 'center',
            marginBottom: '10px',
            fontWeight: 'bold',
            fontSize: '60px',
          }}
        >
          근무표 조회
        </div>

        <FullCalendar
          ref={calendarEl}
          plugins={[timeGridPlugin]}
          initialView="timeGridWeek"
          height="80%"
          headerToolbar={{
            left: 'title',
            center: '',
          }}
          slotDuration="00:30:00"
          events={fetchEvents}
        />
      </div>
    </>
  );
}

