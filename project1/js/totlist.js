$(document).ready(function () {
    const $table = $('#totList');
    let dataTable = $table.DataTable({
        scrollX: true,
        info: true,
        ordering: true,
        paging: true
    });

    // 기본 thead 헤더 구성
    const baseHeaders = `
        <tr>
            <th>번호</th>
            <th>시군명</th>
            <th>분류</th>
            <th>기관명</th>
            <th>시설</th>
            <th>지번주소</th>
            <th>도로명주소</th>
            <th>지도보기</th>
            <th>연락처</th>
            <th>총정원수</th>
            <th>총현원수</th>
            <th>총교직원수</th>
        </tr>
    `;

    const disabledHeaders = `
        <tr>
            <th>번호</th>
            <th>시군명</th>
            <th>분류</th>
            <th>기관명</th>
            <th>시설</th>
            <th>지번주소</th>
            <th>도로명주소</th>
            <th>지도보기</th>
            <th>연락처</th>
            <th>총정원수</th>
            <th>총현원수</th>
            <th>장애아정원수</th>
            <th>장애아현원수</th>
            <th>총교직원수</th>
        </tr>
    `;

    function reloadDataTable(headersHtml, rowsData) {
        // DataTable 제거 후 thead 변경, 재초기화
        dataTable.destroy();
        $table.find('thead').html(headersHtml);
        dataTable = $table.DataTable({
            scrollX: true,
            info: true,
            ordering: true,
            paging: true
        });

        dataTable.clear();

        rowsData.forEach(row => {
            dataTable.row.add(row);
        });

        dataTable.draw();
    }

    // "장애인 전용" 클릭 시
    $('#filter-disabled-only').on('click', function () {
        const apiUrl = 'https://openapi.gg.go.kr/Ggdspsnkidgartn';
        const apiKey = '인증키'; // 여기에 인증키 입력

        $.ajax({
            url: apiUrl,
            method: 'GET',
            data: {
                key: apiKey,
                Type: 'json',
                pIndex: 1,
                pSize: 100
            },
            dataType: 'json',
            success: function (response) {
                const items = response.Ggdspsnkidgartn[1].row;

                // 테이블 기존 데이터 초기화
                table.clear();

                // 응답 데이터로 새로운 행 추가
                items.forEach((item, index) => {
                    table.row.add([
                        index + 1,
                        item.SIGUN_NM || '',
                        item.KIDGARTN_CLASS_NM || '',
                        item.INST_NM || '',
                        item.FACLT_CLASS_NM || '',
                        item.REFINE_LOTNO_ADDR || '',
                        item.REFINE_ROADNM_ADDR || '',
                        `<a href="https://map.kakao.com/?q=${encodeURIComponent(item.REFINE_ROADNM_ADDR || item.REFINE_LOTNO_ADDR)}" target="_blank">지도보기</a>`,
                        item.CONTCT_NO || '',
                        item.TOT_PSN_CAPA_CNT || '',
                        item.TOT_PSTPSN_CNT || '',
                        item.HADCPCHD_PSN_CAPA_CNT || '',
                        item.HADCPCHD_PSTPSN_CNT || '',
                        item.TOT_SCHLSTAF_CNT || ''
                    ]);
                });

                // 테이블 다시 그리기
                table.draw();
                reloadDataTable(disabledHeaders, rowsData);
            },
            error: function () {
                alert('데이터를 불러오는 데 실패했습니다.');
            }
        });
    });

    // 다른 필터 클릭 시 예: "0세아 전용" 등
    $('.box ul li').not('#filter-disabled-only').on('click', function () {
        // 임시 데이터 삽입 (원하는 API로 대체)
        const dummyRows = [
            [1, '수원시', '민간', '예쁜어린이집', '시설A', '수원시 팔달구', '팔달로 123', '지도보기', '010-1234-5678', '80', '75', '12명', '10명', '15명']
        ];

        // 헤더는 기본으로 설정
        reloadDataTable(baseHeaders, dummyRows.map(row => {
            // 장애아 관련 칼럼 제거
            row.splice(11, 2); // 장애아정원수, 장애아현원수 제거
            return row;
        }));
    });
});