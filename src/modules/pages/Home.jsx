import React, { useState, useEffect, memo } from 'react';
import 'antd/dist/antd.css';
import { Button, Card, Col, Row, Select } from 'antd';
import { observer } from 'mobx-react';

const { Option } = Select;

export const Home = observer((props) => {
  const { regionId, library } = props;
  const [regionData, setRegion] = useState(null);
  const [libraryID, setLibraryID] = useState(null);

  useEffect(() => {
    if (regionId) {
      const regData = library.regionData(regionId);
      library.loadRegionLibraries(regData.territory);
      setRegion(regData);
    }
  }, [regionId, library]);

  const { data = [] } = library.regionLibraries;
  return (
    <div className="site-card-wrapper">
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Регион" bordered={false}>
            {regionData && regionData.territory}
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Количество библиотек" bordered={false}>
            {regionData && regionData.libraries}
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Количесто посещений" bordered={false}>
            {regionData && regionData.visits}
          </Card>
        </Col>
      </Row>
      <Card title="Поиск" bordered={false} style={{ width: '100%', margin: '50px 0 50px 0' }}>
        <Select
          showSearch
          style={{ width: '100%' }}
          placeholder="Search to Select"
          optionFilterProp="children"
          onChange={(e) => setLibraryID(e)}
          filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
        >
          {data.map(({ _id, nativeName }) => (
            <Option key={_id} value={_id}>{nativeName}</Option>
          ))}
        </Select>
        <Row>
          <Button
            onClick={() => props.history.push(`/main/list-library/${libraryID}`)}
            style={{ float: 'left', margin: '30px 0 30px 0' }}
            type="primary"
            size="Large"
          >
            Подробнее
          </Button>
        </Row>
      </Card>
    </div>
  );
});
