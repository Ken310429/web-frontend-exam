import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../styles/Modal.scss';
import Description from './Description';


const Modal = ({ jobDetail, loading, onClose }) => {
    if (!jobDetail && !loading) return null;
    
    return (
        <>
            <div className='modal-backdrop' onClick={onClose}></div>
            <div className='modal'>
                {loading ? (
                    <div className='modal-loading'>
                        <span className="loader"></span>
                    </div>
                ) : (
                    <>
                        <div className='modal-header'>
                            <h2>詳細資訊</h2>
                        </div>
                        <div className='modal-body'>
                            <div className='modal-title'>
                                <h3>{jobDetail.companyName}</h3>
                                <p>{jobDetail.jobTitle}</p>
                            </div>                          
                            <Swiper  
                                modules={[Autoplay, Pagination, Navigation]}
                                autoplay={{
                                    delay: 3000,
                                    disableOnInteraction: false
                                }}
                                pagination={{
                                    clickable: true
                                }}
                                navigation={true}
                                loop={true}
                                className="job-carousel"
                            >
                                {jobDetail.companyPhoto.map((photo, index) => (
                                    <SwiperSlide key={index}>
                                        <img src={photo} alt={`${jobDetail.companyName} ${index + 1}`} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            <Description description={jobDetail.description} />
                        </div>
                        <div className='modal-footer'>
                            <button onClick={onClose}>關閉</button>
                        </div>
                    </>
                )}
            </div>
        </>

    );
}

export default Modal;
