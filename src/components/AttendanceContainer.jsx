import React, { useState } from 'react';
import Attendance from './Attendance';

export default function AttendanceContainer({ w }) {
  const [attendanceData, setAttendanceData] = useState({});
  const [semestersData, setSemestersData] = useState(null);
  const [selectedSem, setSelectedSem] = useState(null);
  const [attendanceGoal, setAttendanceGoal] = useState(75);
  const [subjectAttendanceData, setSubjectAttendanceData] = useState({});
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [isAttendanceMetaLoading, setIsAttendanceMetaLoading] = useState(false);
  const [isAttendanceDataLoading, setIsAttendanceDataLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [dailyDate, setDailyDate] = useState(new Date());
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [subjectCacheStatus, setSubjectCacheStatus] = useState({});

  return (
    <div className="pb-24">
      <Attendance
        w={w}
        attendanceData={attendanceData}
        setAttendanceData={setAttendanceData}
        semestersData={semestersData}
        setSemestersData={setSemestersData}
        selectedSem={selectedSem}
        setSelectedSem={setSelectedSem}
        attendanceGoal={attendanceGoal}
        setAttendanceGoal={setAttendanceGoal}
        subjectAttendanceData={subjectAttendanceData}
        setSubjectAttendanceData={setSubjectAttendanceData}
        selectedSubject={selectedSubject}
        setSelectedSubject={setSelectedSubject}
        isAttendanceMetaLoading={isAttendanceMetaLoading}
        setIsAttendanceMetaLoading={setIsAttendanceMetaLoading}
        isAttendanceDataLoading={isAttendanceDataLoading}
        setIsAttendanceDataLoading={setIsAttendanceDataLoading}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        dailyDate={dailyDate}
        setDailyDate={setDailyDate}
        calendarOpen={calendarOpen}
        setCalendarOpen={setCalendarOpen}
        isTrackerOpen={isTrackerOpen}
        setIsTrackerOpen={setIsTrackerOpen}
        subjectCacheStatus={subjectCacheStatus}
        setSubjectCacheStatus={setSubjectCacheStatus}
      />
    </div>
  );
}