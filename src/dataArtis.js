const data = [
    {
        name: "Nguyễn Thanh Tùng",
        dob: "5-7-1994",
        stageName: "Sơn Tùng MTP",
        info: "Được mệnh danh là `Hoàng tử V - pop`, Sơn Tùng M-TP được nhiều nhà báo âm nhạc, nhà lý luận phê bình và tác giả xem là một trong những nghệ sĩ V-pop thành công nhất ở thời điểm hiện tại. Trong suốt sự nghiệp của mình, Tùng nhận được nhiều giải thưởng trong nước và quốc tế, bao gồm một giải thưởng Âm nhạc Cống hiến, một giải Âm nhạc châu Âu của MTV, một giải Mnet Asian Music Awards, bảy giải Làn Sóng Xanh và được xếp vào danh sách 30 Under 30 của tạp chí Forbes Vietnam."
    },
    {
        name: "Trần Anh Quân",
        dob: "21-9-1993",
        stageName: "Jaykii",
        info: "Trần Anh Quân từng xuất sắc lọt vào TOP 10 VietNam Idol 2013. Dừng chân lại ở TOP 10 nhưng Anh Quân đã nhận được rất nhiều tình cảm của khán giả. Trần Anh Quân đã đổi nghệ danh sang JayKii.Chia sẻ về nghệ danh mới, nam ca sĩ chia sẻ anh muốn sự nghiệp của mình sẽ bước sang một trang mới với cái tên mới. Sở dĩ anh lấy tên JayKii vì anh là một fan cứng của giám khảo Asia's Got Talent 2017 - Jay Park. JayKii sở hữu chiều cao lý tưởng cùng khuôn mặt điển trai, nụ cười duyên khiến không ít fan nữ ôm tim rung rinh. "
    }
]

console.log(data[1].name);

function getData(){
    let displayInfor;
    displayInfor = document.getElementById("infor").data[0].name;
}