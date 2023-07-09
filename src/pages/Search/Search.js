import React, { useEffect, useState } from 'react';
import '../../styles/scss/_search.scss';
import TravelImg from '../../assets/images/graphics/travel.png';
import Filterboard from './Filterboard';
import BannerInput from '../../components/common/BannerInput';
import { useForm } from 'react-hook-form';
import { BANNER_INPUT } from '../../constants/Variables.constants';
import { useLocation } from 'react-router-dom';
import {
    parseSearchParams,
    stringifySearchParams
} from '../../utils/helpers/params';
import Hotel from './Hotel';

const Search = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [hotels, setHotels] = useState([]);
    const [criteria, setCriteria] = useState(parseSearchParams(useLocation().search));
    const defaultValues = Object.keys(BANNER_INPUT).reduce((values, key) => {
        const inputName = BANNER_INPUT[key].INPUT_NAME;
        if (Array.isArray(inputName)) {
            inputName.forEach(n => {
                values[n] = criteria[n];
            });
            return values;
        }
        else {
            values[BANNER_INPUT[key].INPUT_NAME] = criteria[BANNER_INPUT[key].INPUT_NAME];
            return values;
        }
    }, {});
    const criteriaBoardForm = useForm({
        defaultValues
    });
    const searchBoardForm = useForm();

    const onResearch = (data) => {
        setCriteria(data);
        window.history.pushState(null, null, `/search${stringifySearchParams(data)}`);
    };

    const renderHotels = (hotelList) => {
        if (!Array.isArray(hotelList)) return <></>;
        return hotelList.map(hotel => {
            return (
                <Hotel data={hotel} />
            )
        })
    }

    const renderPagePaginationNumberBtn = (targetPage, numberOfPages) => {
        const displayPages = [];

        if(targetPage === 1) {
            for(let i = 0; i < 3 && targetPage + i <= numberOfPages; i++) {
                displayPages.push({page: targetPage + i, active: i === 0 ? true : false});
            }
        }
        else if(targetPage < numberOfPages) {
            displayPages.push(
                {page: targetPage - 1, active: false},
                {page: targetPage, active: true},
                {page: targetPage + 1, active: false}
            );
        }
        else if(targetPage === numberOfPages) {
            for(let i = 2; i >= 0 && targetPage - i >= 1; i--) {
                displayPages.push({page: targetPage - i, active: i === 0 ? true : false});
            }
        }

        const htmlDisplayPages = displayPages.map((p, i) => {
            return (
                <button 
                    className={p.active ? 'active' : ''} 
                    data-pagenumber={p.page}
                    // onClick={e => handleChangeTrendingHotelPage(e)}
                    key={`trending-hotel-page-number@${i}`}
                >
                    {p.page}
                </button>
            )
        })

        return (
            <>{htmlDisplayPages}</>
        )
    }

    useEffect(() => {
        setHotels([
            {
                id: 1,
                name: "Khách sạn Caravelle Saigon",
                country: "Việt Nam",
                provinceCity: "Hồ Chí Minh",
                address: "17 Công Trường Lam Sơn, Quận 1",
                stars: 5,
                rating: 9.1,
                description: "Một khách sạn cao cấp tọa lạc tại trung tâm Thành phố Hồ Chí Minh với dịch vụ chất lượng và tầm nhìn tuyệt đẹp.",
                image: "https://rialloer.sirv.com/Sunrise-Continent/hotels/7%20La%20Siesta%20Premium%20Sai%20Gon/462029553.jpg",
                price: 350000,
                amenities: ["Bể bơi", "Internet", "Bãi để xe"],
                services: ["BREAKFAST_INCLUDED", "DINNER_INCLUDED"],
            },
            {
                id: 2,
                name: "Fusion Maia Resort",
                country: "Việt Nam",
                provinceCity: "Đà Nẵng",
                address: "Võ Nguyên Giáp, Phường Khuê Mỹ, Quận Ngũ Hành Sơn",
                stars: 5,
                rating: 9.3,
                description: "Một khu nghỉ dưỡng sang trọng tại bãi biển Mỹ Khê, Đà Nẵng, với các liệu pháp spa và dịch vụ chăm sóc sức khỏe đẳng cấp.",
                image: "https://rialloer.sirv.com/Sunrise-Continent/hotels/Crown%20Hotel%20Nha%20Trang/Ph%C3%B2ng%20Deluxe%20C%C3%B3%20Gi%C6%B0%E1%BB%9Dng%20C%E1%BB%A1%20King1.2.jpg",
                price: 450000,
                amenities: ["Bể bơi", "Internet"],
                services: ["BREAKFAST_INCLUDED"],
            },
            {
                id: 3,
                name: "InterContinental Danang Sun Peninsula Resort",
                country: "Việt Nam",
                provinceCity: "Đà Nẵng",
                address: "Bãi Bắc, Sơn Trà",
                stars: 5,
                rating: 9.5,
                description: "Một khu nghỉ dưỡng xa hoa nằm trên bán đảo Sơn Trà, Đà Nẵng, với kiến trúc độc đáo và cảnh quan thiên nhiên tuyệt đẹp.",
                image: "https://rialloer.sirv.com/Sunrise-Continent/hotels/Florida%20Nha%20Trang%20Hotel/Ph%C3%B2ng%20Deluxe%20Gi%C6%B0%E1%BB%9Dng%20%C4%90%C3%B4i.2%20Gi%C6%B0%E1%BB%9Dng%20%C4%90%C6%A1n%20Nh%C3%ACn%20Ra%20Th%C3%A0nh%20Ph%E1%BB%912.jpg",
                price: 500000,
                amenities: [],
                services: ["BREAKFAST_INCLUDED", "DINNER_INCLUDED", "FREE_SNACKS"],
            },
            {
                id: 4,
                name: "La Siesta Hoi An Resort & Spa",
                country: "Việt Nam",
                provinceCity: "Hội An",
                address: "132 Hùng Vương, Phường Thanh Hà",
                stars: 4,
                rating: 9.0,
                description: "Một khu nghỉ dưỡng yên bình và sang trọng tọa lạc tại phố cổ Hội An, với các dịch vụ spa và nhà hàng tuyệt vời.",
                image: "https://rialloer.sirv.com/Sunrise-Continent/hotels/iHome%20Hoi%20An/Ph%C3%B2ng%20Gi%C6%B0%E1%BB%9Dng%20%C4%90%C3%B4i%20Nh%C3%ACn%20Ra%20H%E1%BB%93%20B%C6%A1i3.jpg",
                price: 300000,
                amenities: ["Bể bơi", "Internet", "Bãi để xe"],
                services: ["BREAKFAST_INCLUDED", "LUNCH_INCLUDED"],
            },
            {
                id: 5,
                name: "Anantara Hoi An Resort",
                country: "Việt Nam",
                provinceCity: "Hội An",
                address: "1 Phạm Hồng Thái, Phường Cẩm Châu",
                stars: 5,
                rating: 9.2,
                description: "Một khu nghỉ dưỡng nằm bên sông Thu Bồn tại Hội An, với phong cách kiến trúc cổ điển và không gian thư giãn tuyệt vời.",
                image: "https://rialloer.sirv.com/Sunrise-Continent/hotels/Musketeers%20Guest%20House/Pho%CC%80ng%20Deluxe%20Gi%C6%B0%C6%A1%CC%80ng%20%C4%90%C3%B4i1.jpg",
                price: 380000,
                amenities: ["Bể bơi", "Internet", "Bãi để xe", "Đưa đón sân bay", "Phòng tập"],
                services: [],
            },
            {
                id: 6,
                name: "Victoria Sapa Resort & Spa",
                country: "Việt Nam",
                provinceCity: "Lào Cai",
                address: "Xuân Vũ, Thị trấn Sa Pa",
                stars: 4,
                rating: 8.8,
                description: "Một khu nghỉ dưỡng nằm trên dãy núi Hoàng Liên Sơn ở Sa Pa, với các căn phòng thoáng đãng và không gian spa tuyệt vời.",
                image: "https://rialloer.sirv.com/Sunrise-Continent/hotels/2%20Gemini%20Saigon%20CENTER/289743785.jpg",
                price: 280000,
                amenities: ["Bể bơi", "Internet"],
                services: ["AFTERNOON_TEA"],
            },
            {
                id: 7,
                name: "Vinpearl Resort & Golf Nam Hội An",
                country: "Việt Nam",
                provinceCity: "Quảng Nam",
                address: "Bình Dương, Thăng Bình",
                stars: 5,
                rating: 9.1,
                description: "Một khu nghỉ dưỡng tại bãi biển Nam Hội An, với sân golf, hồ bơi và các tiện ích giải trí hiện đại.",
                image: "https://rialloer.sirv.com/Sunrise-Continent/hotels/1%20Ngan%20Ha%20Hotel/398883320.jpg",
                price: 400000,
                amenities: [],
                services: [],
            },
            {
                id: 8,
                name: "Sunrise Premium Resort Hạ Long",
                country: "Việt Nam",
                provinceCity: "Quảng Ninh",
                address: "Hạ Long Road, Bãi Cháy",
                stars: 5,
                rating: 9.0,
                description: "Một khu nghỉ dưỡng nằm trên bãi biển Hạ Long, với các phòng hướng ra biển và không gian nghỉ ngơi tiện nghi.",
                image: "https://rialloer.sirv.com/Sunrise-Continent/hotels/1%20Ngan%20Ha%20Hotel/222593715.jpg",
                price: 280000,
                amenities: ["Bể bơi", "Internet"],
                services: ["BREAKFAST_INCLUDED", "DINNER_INCLUDED"],
            },
            {
                id: 9,
                name: "Melia Hanoi Hotel",
                country: "Việt Nam",
                provinceCity: "Hà Nội",
                address: "44B Lý Thường Kiệt, Quận Hoàn Kiếm",
                stars: 5,
                rating: 8.7,
                description: "Một khách sạn sang trọng nằm ở trung tâm Hà Nội, với các tiện nghi và dịch vụ chất lượng cao.",
                image: "https://rialloer.sirv.com/Sunrise-Continent/hotels/Nexus%20House%20Thao%20Dien/C%C4%83n%20H%E1%BB%99%20C%C3%B3%20Ban%20C%C3%B4ng2.jpg",
                price: 4000000,
                amenities: ["Bể bơi", "Internet", "Bãi để xe"],
                services: ["BREAKFAST_INCLUDED", "DINNER_INCLUDED"],
            },
            {
                id: 10,
                name: "Sheraton Nha Trang Hotel & Spa",
                country: "Việt Nam",
                provinceCity: "Khánh Hòa",
                address: "26-28 Trần Phú, Thành phố Nha Trang",
                stars: 5,
                rating: 8.9,
                description: "Một khách sạn nằm ngay trên bãi biển Nha Trang, với các dDưới đây là một mảng gồm 20 khách sạn tại Việt Nam",
                image: "https://rialloer.sirv.com/Sunrise-Continent/hotels/6%20Adora%20Art%20Hotel/219740049.jpg",
                price: 400000,
                amenities: ["Đưa đón sân bay", "Phòng tập"],
                services: ["BREAKFAST_INCLUDED"],
            },
            {
                id: 11,
                name: "Khách sạn Caravelle Saigon",
                country: "Việt Nam",
                provinceCity: "Hồ Chí Minh",
                address: "17 Công Trường Lam Sơn, Quận 1",
                stars: 5,
                rating: 9.1,
                description: "Một khách sạn cao cấp tọa lạc tại trung tâm Thành phố Hồ Chí Minh với dịch vụ chất lượng và tầm nhìn tuyệt đẹp.",
                image: "https://rialloer.sirv.com/Sunrise-Continent/hotels/7%20La%20Siesta%20Premium%20Sai%20Gon/462029553.jpg",
                price: 350000,
                amenities: ["Bể bơi", "Internet", "Bãi để xe"],
                services: ["BREAKFAST_INCLUDED", "DINNER_INCLUDED"],
            },
            {
                id: 12,
                name: "Fusion Maia Resort",
                country: "Việt Nam",
                provinceCity: "Đà Nẵng",
                address: "Võ Nguyên Giáp, Phường Khuê Mỹ, Quận Ngũ Hành Sơn",
                stars: 5,
                rating: 9.3,
                description: "Một khu nghỉ dưỡng sang trọng tại bãi biển Mỹ Khê, Đà Nẵng, với các liệu pháp spa và dịch vụ chăm sóc sức khỏe đẳng cấp.",
                image: "https://rialloer.sirv.com/Sunrise-Continent/hotels/Crown%20Hotel%20Nha%20Trang/Ph%C3%B2ng%20Deluxe%20C%C3%B3%20Gi%C6%B0%E1%BB%9Dng%20C%E1%BB%A1%20King1.2.jpg",
                price: 450000,
                amenities: ["Bể bơi", "Internet"],
                services: ["BREAKFAST_INCLUDED"],
            },
            {
                id: 13,
                name: "InterContinental Danang Sun Peninsula Resort",
                country: "Việt Nam",
                provinceCity: "Đà Nẵng",
                address: "Bãi Bắc, Sơn Trà",
                stars: 5,
                rating: 9.5,
                description: "Một khu nghỉ dưỡng xa hoa nằm trên bán đảo Sơn Trà, Đà Nẵng, với kiến trúc độc đáo và cảnh quan thiên nhiên tuyệt đẹp.",
                image: "https://rialloer.sirv.com/Sunrise-Continent/hotels/Florida%20Nha%20Trang%20Hotel/Ph%C3%B2ng%20Deluxe%20Gi%C6%B0%E1%BB%9Dng%20%C4%90%C3%B4i.2%20Gi%C6%B0%E1%BB%9Dng%20%C4%90%C6%A1n%20Nh%C3%ACn%20Ra%20Th%C3%A0nh%20Ph%E1%BB%912.jpg",
                price: 500000,
                amenities: [],
                services: ["BREAKFAST_INCLUDED", "DINNER_INCLUDED", "FREE_SNACKS"],
            },
            {
                id: 14,
                name: "La Siesta Hoi An Resort & Spa",
                country: "Việt Nam",
                provinceCity: "Hội An",
                address: "132 Hùng Vương, Phường Thanh Hà",
                stars: 4,
                rating: 9.0,
                description: "Một khu nghỉ dưỡng yên bình và sang trọng tọa lạc tại phố cổ Hội An, với các dịch vụ spa và nhà hàng tuyệt vời.",
                image: "https://rialloer.sirv.com/Sunrise-Continent/hotels/iHome%20Hoi%20An/Ph%C3%B2ng%20Gi%C6%B0%E1%BB%9Dng%20%C4%90%C3%B4i%20Nh%C3%ACn%20Ra%20H%E1%BB%93%20B%C6%A1i3.jpg",
                price: 300000,
                amenities: ["Bể bơi", "Internet", "Bãi để xe"],
                services: ["BREAKFAST_INCLUDED", "LUNCH_INCLUDED"],
            }
        ])
    }, [])



    return (
        <main className='search'>
            <div className="search__banner">
                <img src={TravelImg} alt="travel" />
                <h5>Bạn muốn du lịch tới Vương Quốc Anh?</h5>
                <small>Hãy đọc tất cả các yêu cầu thủ tục nhập cảnh trước khi đặt chỗ nhé.</small>
                <button>
                    Tìm hiểu thêm
                </button>
            </div>
            <form className="search__criteria-board" onSubmit={criteriaBoardForm.handleSubmit(onResearch)}>
                <BannerInput
                    name={BANNER_INPUT.LOCATION.INPUT_NAME}
                    type={BANNER_INPUT.LOCATION.TYPE}
                    form={criteriaBoardForm}
                />
                <BannerInput
                    name={BANNER_INPUT.DATE_TIME_DOUBLE.INPUT_NAME}
                    type={BANNER_INPUT.DATE_TIME_DOUBLE.TYPE}
                    form={criteriaBoardForm}
                />
                <BannerInput
                    name={BANNER_INPUT.PEOPLE_AND_ROOM.INPUT_NAME}
                    title={BANNER_INPUT.PEOPLE_AND_ROOM.TITLE}
                    description={BANNER_INPUT.PEOPLE_AND_ROOM.DESCRIPTION}
                    type={BANNER_INPUT.PEOPLE_AND_ROOM.TYPE}
                    min={BANNER_INPUT.PEOPLE_AND_ROOM.MIN_VALUE}
                    form={criteriaBoardForm}
                />
                <button type='submit' className='search__submit-btn'>
                    Tìm kiếm
                </button>
            </form>
            <Filterboard form={searchBoardForm} />
            <div className="search__results">
                <div className="results__title-container">
                    <h3 className='results__title'>
                        Kết quả cho&nbsp;
                        <span>
                            {criteria[BANNER_INPUT.LOCATION.INPUT_NAME]}
                        </span>
                        <span>
                            {Object.keys(criteria).length > 1 && ` và +${Object.keys(criteria).length} tuỳ chọn khác`}
                        </span>
                    </h3>
                    <small>Hiển thị 0 - 14 trong {Number(4102014).toLocaleString('en')} kết quả</small>
                </div>
                <hr />
                <div className="results__subtitle-container">
                    <div className="result__subtitle">
                        <p>Thời gian được tính theo giờ địa phương</p>
                        <p>Đã bao gồm thuế và phí</p>
                    </div>
                    <div className="results__sort-container">
                        <button>
                            <span>Sắp xếp theo</span>
                            <i className="fi fi-ts-angle-small-down"></i>
                        </button>
                        <div className="results-sort__dropdown active">
                            <button>Phổ biến nhất</button>
                            <button>Giá tăng dần</button>
                            <button>Giá giảm dần</button>
                        </div>
                    </div>
                </div>
                <div className="results__list">
                    {renderHotels(hotels)}
                    <div className="results__page-pagination-wrapper">
                        {
                            <div className="results__page-pagination">
                                <button>
                                    <i className="fi fi-rs-angle-double-small-left"></i>
                                </button>
                                <button>
                                    <i className="fi fi-rs-angle-small-left"></i>
                                </button>

                                {renderPagePaginationNumberBtn(currentPage, 10)}

                                <button>
                                    <i className="fi fi-rs-angle-small-right"></i>
                                </button>
                                <button>
                                    <i className="fi fi-rs-angle-double-small-right"></i>
                                </button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Search;