/**
 * Website Constants - Thông tin công ty và cấu hình
 * Cập nhật: 27/09/2026
 */

// ===== THÔNG TIN CÔNG TY =====
export const COMPANY = {
  name: "CÔNG TY CỔ PHẦN XÂY DỰNG THANH CHƯƠNG",
  shortName: "THANH CHƯƠNG JSC",
  englishName: "THANH CHUONG CONSTRUCTION JOINT STOCK COMPANY",
  
  // Thông tin pháp lý
  taxCode: "0106763717", // Mã số thuế
  businessLicense: "0106763717", // Số GPKD
  licenseIssueDate: "29/01/2015",
  licenseIssuedBy: "Sở Kế hoạch & Đầu tư Hà Nội",
  
  // Phòng thí nghiệm
  lab: {
    name: "Phòng Thí nghiệm LAS-XD 795",
    code: "LAS-XD 795",
    accreditedBy: "Bộ Xây dựng",
    scope: "Thí nghiệm vật liệu xây dựng và kiểm định chất lượng công trình",
  },
  
  // Thông tin liên hệ
  contact: {
    hotline: "0939688669",
    phone: "09396886699",
    email: "Thanhchuong.jsc@gmail.com",
    website: "https://kdxdthanhchuong.vn",
    fax: "(04) 62917569",
  },
  
  // Văn phòng & chi nhánh
  offices: [
    {
      id: "hanoi",
      city: "Hà Nội",
      type: "Phòng thí nghiệm",
      address: "Xóm Lai, thôn Phù Dực 1, xã Phù Đổng, thành phố Hà Nội",
      phone: "09396886699",
      map: "https://maps.google.com/?q=Xóm+Lai,Phù+Dực+1,Phù+Đổng,Hà+Nội",
      // Google Maps Embed
      embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.8639849729453!2d105.83991541533315!3d21.036765793369467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDAyJzEyLjQiTiAxMDXCsDUwJzI3LjYiRQ!5e0!3m2!1svi!2s!4v1234567890123!5m2!1svi!2s",
      coordinates: {
        lat: 21.036765793369467,
        lng: 105.83991541533315,
      },
    },
    {
      id: "bacninh",
      city: "Bắc Ninh",
      type: "Văn phòng",
      address: "Số 508, đường Nguyễn Văn Cừ, P. Võ Cường, tỉnh Bắc Ninh",
      phone: "09396886699",
      map: "https://maps.google.com/?q=508+Nguyễn+Văn+Cừ,Võ+Cường,Bắc+Ninh",
      // Google Maps Embed
      embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.8639849729453!2d106.07591541533315!3d21.136765793369467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDA4JzEyLjQiTiAxMDbCsDA0JzI3LjYiRQ!5e0!3m2!1svi!2s!4v1234567890123!5m2!1svi!2s",
      coordinates: {
        lat: 21.136765793369467,
        lng: 106.07591541533315,
      },
    },
  ],
  
  // Mạng xã hội
  social: {
    facebook: "https://facebook.com/thanhchuongjsc", // TODO: Update URL thật
    youtube: "https://youtube.com/@thanhchuongjsc", // TODO: Update URL thật
    zalo: "https://zalo.me/0939688669",
    linkedin: "", // Thêm nếu có
  },
  
  // Giờ làm việc
  workingHours: {
    weekdays: "Thứ 2 - Thứ 6: 8:00 - 17:30",
    saturday: "Thứ 7: 8:00 - 12:00",
    sunday: "Chủ nhật: Nghỉ",
  },
};

// ===== DỊCH VỤ CHÍNH =====
export const MAIN_SERVICES = [
  {
    id: "testing",
    name: "Thí nghiệm vật liệu xây dựng",
    icon: "FlaskConical",
    description: "Thí nghiệm đất, cát, sỏi, đá dăm, xi măng, bê tông, thép...",
  },
  {
    id: "inspection",
    name: "Kiểm định chất lượng công trình",
    icon: "ClipboardCheck",
    description: "Kiểm tra, đánh giá chất lượng công trình xây dựng",
  },
  {
    id: "foundation",
    name: "Thí nghiệm nền móng",
    icon: "Mountain",
    description: "Khảo sát địa chất, thí nghiệm sức chịu tải nền móng",
  },
  {
    id: "supervision",
    name: "Tư vấn giám sát thi công",
    icon: "HardHat",
    description: "Giám sát chất lượng, tiến độ và an toàn thi công",
  },
  {
    id: "monitoring",
    name: "Quan trắc công trình",
    icon: "Activity",
    description: "Theo dõi, đo đạc và cảnh báo biến dạng công trình",
  },
  {
    id: "geology",
    name: "Khảo sát địa chất công trình",
    icon: "MountainSnow",
    description: "Khảo sát, đánh giá điều kiện địa chất nền móng",
  },
];

// ===== THỐNG KÊ =====
export const STATS = {
  experience: "10+",
  projects: "1000+",
  engineers: "50+",
  testParameters: "100+",
};

// ===== CHỨNG NHẬN & GIẤY PHÉP (Template - cần cập nhật) =====
export const CERTIFICATES = [
  {
    id: "business-license",
    type: "Giấy phép kinh doanh",
    number: "0106763717",
    issuedBy: "Sở KH&ĐT Hà Nội",
    issuedDate: "29/01/2015",
    image: "/certificates/gpkd.jpg", // TODO: Upload ảnh thật
  },
  {
    id: "lab-accreditation",
    type: "Chứng nhận Phòng TN",
    number: "LAS-XD 795",
    issuedBy: "Bộ Xây dựng",
    issuedDate: "", // TODO: Cập nhật
    image: "/certificates/las-xd-795.jpg", // TODO: Upload ảnh thật
  },
  {
    id: "iso-9001",
    type: "ISO 9001:2015",
    number: "", // TODO: Cập nhật nếu có
    issuedBy: "",
    issuedDate: "",
    image: "/certificates/iso-9001.jpg", // TODO: Upload nếu có
  },
  // Thêm các chứng nhận khác...
];

// ===== ĐỘI NGŨ (Template - cần cập nhật) =====
export const TEAM_MEMBERS = [
  {
    id: "ceo",
    name: "Giám đốc", // TODO: Cập nhật tên thật
    position: "Giám đốc điều hành",
    avatar: "/team/ceo.jpg",
    bio: "Hơn 15 năm kinh nghiệm trong lĩnh vực xây dựng",
  },
  {
    id: "technical-director",
    name: "Kỹ sư trưởng",
    position: "Giám đốc kỹ thuật",
    avatar: "/team/technical.jpg",
    bio: "Chuyên gia kiểm định chất lượng công trình",
  },
  // Thêm thành viên khác...
];

// ===== ĐỐI TÁC (Template) =====
export const PARTNERS = [
  {
    id: "partner-1",
    name: "Tập đoàn Xây dựng ABC", // TODO: Cập nhật đối tác thật
    logo: "/partners/partner-1.png",
    website: "",
  },
  // Thêm đối tác khác...
];

// ===== CÂU HỎI THƯỜNG GẶP =====
export const FAQS = [
  {
    question: "Phòng thí nghiệm của công ty có được công nhận không?",
    answer: "Có, Phòng Thí nghiệm LAS-XD 795 của chúng tôi được Bộ Xây dựng công nhận đủ năng lực thực hiện các thí nghiệm, kiểm định chất lượng vật liệu xây dựng và công trình.",
  },
  {
    question: "Thời gian trả kết quả thí nghiệm là bao lâu?",
    answer: "Tùy thuộc vào loại thí nghiệm, thông thường từ 3-7 ngày làm việc. Chúng tôi có thể rút ngắn thời gian nếu khách hàng có yêu cầu khẩn cấp.",
  },
  {
    question: "Công ty có nhận tư vấn giám sát thi công không?",
    answer: "Có, chúng tôi cung cấp dịch vụ tư vấn giám sát thi công toàn diện, đảm bảo chất lượng, tiến độ và an toàn cho công trình của bạn.",
  },
  {
    question: "Chi phí dịch vụ như thế nào?",
    answer: "Chi phí phụ thuộc vào loại dịch vụ và quy mô công trình. Vui lòng liên hệ hotline 0939.688.669 để được tư vấn và báo giá chi tiết.",
  },
  {
    question: "Công ty có làm việc ngoài giờ và ngày lễ không?",
    answer: "Với các công trình khẩn cấp hoặc theo yêu cầu đặc biệt của khách hàng, chúng tôi có thể sắp xếp làm việc ngoài giờ. Vui lòng liên hệ trước để được hỗ trợ tốt nhất.",
  },
];

// ===== QUY TRÌNH LÀM VIỆC =====
export const WORK_PROCESS = [
  {
    step: 1,
    title: "Tiếp nhận yêu cầu",
    description: "Khách hàng liên hệ qua hotline, email hoặc đến trực tiếp văn phòng",
    icon: "Phone",
  },
  {
    step: 2,
    title: "Tư vấn & Báo giá",
    description: "Chuyên viên tư vấn chi tiết, gửi báo giá và hợp đồng",
    icon: "FileText",
  },
  {
    step: 3,
    title: "Ký kết hợp đồng",
    description: "Hai bên thống nhất điều khoản và ký hợp đồng dịch vụ",
    icon: "FileSignature",
  },
  {
    step: 4,
    title: "Triển khai thực hiện",
    description: "Đội ngũ kỹ sư tiến hành khảo sát, lấy mẫu, thí nghiệm",
    icon: "Cog",
  },
  {
    step: 5,
    title: "Báo cáo kết quả",
    description: "Gửi báo cáo chính thức đầy đủ, chính xác theo quy định",
    icon: "CheckCircle",
  },
  {
    step: 6,
    title: "Hỗ trợ sau dịch vụ",
    description: "Giải đáp thắc mắc, tư vấn thêm nếu khách hàng cần",
    icon: "Headset",
  },
];

// ===== SEO & METADATA =====
export const SEO = {
  defaultTitle: "THANH CHƯƠNG JSC - Kiểm định xây dựng chuyên nghiệp",
  titleTemplate: "%s | THANH CHƯƠNG JSC",
  description: "Công ty CP Xây dựng Thanh Chương - Phòng TN LAS-XD 795. Chuyên Thí nghiệm, Kiểm định, Tư vấn giám sát xây dựng. Hơn 10 năm kinh nghiệm, hơn 1000 công trình.",
  keywords: [
    "kiểm định xây dựng",
    "thí nghiệm vật liệu",
    "tư vấn giám sát xây dựng",
    "LAS-XD 795",
    "kiểm tra chất lượng công trình",
    "khảo sát địa chất",
    "thanh chương jsc",
  ],
  ogImage: "/og-image.jpg", // TODO: Tạo ảnh OG 1200x630
};

// ===== CẤU HÌNH =====
export const CONFIG = {
  siteName: COMPANY.shortName,
  siteUrl: COMPANY.contact.website,
  locale: "vi_VN",
  defaultLocale: "vi",
};
