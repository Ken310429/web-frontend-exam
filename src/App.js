import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './App.scss';
import Eye from './components/Eye';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Pagination from '@mui/material/Pagination';
import Card from './components/Card';
import Modal from './components/Modal';

const App = () => {
  const [jobList, setJobList] = useState([]);
  const [educationList, setEducationList] = useState([]);
  const [companyNameOptions, setCompanyNameOptions] = useState([]);
  const [salaryList, setSalaryList] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedEducation, setSelectedEducation] = useState(null);
  const [selectedSalary, setSelectedSalary] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [modalLoading, setModalLoading] = useState(false);
  const [jobDetail, setJobDetail] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    getCompanyNames();
    getEducation();
    getSalary();
  }, []);


  const getCompanyNames = async () => {
    try {
      const response = await fetch('api/v1/jobs');
      if (response.ok) {
        const data = await response.json();
        setCompanyNameOptions([...new Set(data.data.map(job => job.companyName))]);
      }
    } catch (error) {
      console.error('取得公司名稱失敗', error);
    }
  };
  const searchJobs = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append('page', page);
      params.append('pre_page', itemsPerPage);
      if (selectedCompany) {
        params.append('company_name', selectedCompany);
      }
      if (selectedEducation) {
        params.append('education_level', selectedEducation.id);
      }
      if (selectedSalary) {
        params.append('salary_level', selectedSalary.id);
      }

      const response = await fetch(`api/v1/jobs?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setJobList(data);
      }
    } catch (error) {
      console.error('取得工作列表失敗', error);
    } finally {
      setLoading(false);
    }
  }, [selectedCompany, selectedEducation, selectedSalary, itemsPerPage]);

 
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const handleResize = (e) => {
      const newItemsPerPage = e.matches ? 4 : 6;
      setItemsPerPage(newItemsPerPage);
      searchJobs(1);
      setCurrentPage(1);
    };
    handleResize(mediaQuery);
    mediaQuery.addEventListener('change', handleResize);

    return () => {
      mediaQuery.removeEventListener('change', handleResize);
    };
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getEducation = async () => {
    try {
      const response = await fetch('api/v1/educationLevelList');
      if (response.ok) {
        const data = await response.json();

        setEducationList(data)
      }
    } catch (error) {
      console.error('取得教育程度失敗', error);
    }
  };
  const getSalary = async () => {
    try {
      const response = await fetch('api/v1/salaryLevelList');
      if (response.ok) {
        const data = await response.json();
        setSalaryList(data)
      }
    } catch (error) {
      console.error('取得薪資範圍失敗', error);
    }
  };

  const educationMap = useMemo(() => {
    return Object.fromEntries(educationList.map(item => [item.id, item.label]));
  }, [educationList]);

  const salaryMap = useMemo(() => {
    return Object.fromEntries(salaryList.map(item => [item.id, item.label]));
  }, [salaryList]);

  const handleSearchClick = (page) => {
    setCurrentPage(page);
    searchJobs(page);
  }

  const openJobDetail = async (jobId) => {
    setModalOpen(true);
    setModalLoading(true);
    try {
      const response = await fetch(`api/v1/jobs/${jobId}`);
      if (response.ok) {
        const data = await response.json();
        setJobDetail(data);
      }
    } catch (error) {
      console.error('取得工作詳情失敗', error);
    } finally {
      setModalLoading(false);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setJobDetail(null);
  };

  return (
    <div className='main'>
      <div className='background-animation'>
        <img className='background-img' src='/images/Background-01.png' alt='Background' />
        <img className='character-01-white' src='/images/Character-02.png' alt='Character 02' />
        <img className='logo-01' src='/images/Logo-01.png' alt='logoImg' />
        <Eye imgUrl='/images/Left-Eye.png' eyeClass='left-eye' />
        <Eye imgUrl='/images/Right-Eye.png' eyeClass='right-eye' />
        <img className='character-01' src='/images/Character-01.png' alt='Character 01' />
      </div>
      <div className='top-work'>
        <p className='title'>適合前端工程師的好工作</p>
        <div className='filter-section'>
          <Autocomplete
            disablePortal
            options={companyNameOptions}
            value={selectedCompany}
            onChange={(e, value) => setSelectedCompany(value)}
            sx={{ width: '50%' }}
            renderInput={(params) => <TextField {...params} label="公司名稱" placeholder="請輸入公司名稱" />}
          />
          <Autocomplete
            disablePortal
            options={educationList}
            getOptionLabel={(option) => option.label}
            value={selectedEducation}
            onChange={(e, value) => setSelectedEducation(value)}
            sx={{ width: '18%' }}
            renderInput={(params) => <TextField {...params} label="教育程度" placeholder="不限" />}
          />
          <Autocomplete
            disablePortal
            options={salaryList}
            getOptionLabel={(option) => option.label}
            value={selectedSalary}
            onChange={(e, value) => setSelectedSalary(value)}
            sx={{ width: '22%' }}
            renderInput={(params) => <TextField {...params} label="薪水範圍" placeholder="不限" />}
          />
          <button className='searchButton' onClick={() => handleSearchClick(1)}>條件搜尋</button>
        </div>
        {
          loading ?
            <div className='empty-state'>
              <span className="loader"></span>
            </div>
            : jobList.data && jobList.data.length > 0 ?
              <>
                <div className='job-grid'>
                  {jobList.data.map((job) => (
                    <Card key={job.id} job={job} educationMap={educationMap} salaryMap={salaryMap} onViewDetail={openJobDetail}/>
                  ))}
                </div>
                <Pagination
                  className='pagination'
                  count={Math.ceil((jobList.total || 0) / itemsPerPage)}
                  page={currentPage}
                  onChange={(e, page) => { handleSearchClick(page); }}
                />
              </>
              :
              <div className='empty-state'>無資料</div>
        }
      </div>
      {
        modalOpen&& 
          <Modal jobDetail={jobDetail} loading={modalLoading} onClose={closeModal} />
      }
    </div>
  )
}

export default App;
