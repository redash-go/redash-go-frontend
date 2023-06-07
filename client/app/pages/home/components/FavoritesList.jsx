import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Link from "@/components/Link";
import LoadingOutlinedIcon from "@ant-design/icons/LoadingOutlined";

import { Dashboard } from "@/services/dashboard";
import { Query } from "@/services/query";

export function FavoriteList({ title, resource, itemUrl, emptyState }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    resource
      .favorites()
      .then(({ results }) => setItems(results))
      .finally(() => setLoading(false));
  }, [resource]);

  return (
    <>
      <div className="d-flex align-items-center m-b-20">
        <p className="flex-fill f-500 c-black m-0">{title}</p>
        {loading && <LoadingOutlinedIcon />}
      </div>
      {!isEmpty(items) && (
        <div role="list" className="list-group">
          {items.map(item => (
            <Link key={itemUrl(item)} role="listitem" className="list-group-item" href={itemUrl(item)}>
              <span className="btn-favorite m-r-5">
                <i className="fa fa-star" aria-hidden="true" />
              </span>
              {item.name}
              {item.is_draft && <span className="label label-default m-l-5">未发布</span>}
            </Link>
          ))}
        </div>
      )}
      {isEmpty(items) && !loading && emptyState}
    </>
  );
}

FavoriteList.propTypes = {
  title: PropTypes.string.isRequired,
  resource: PropTypes.func.isRequired, // eslint-disable-line react/forbid-prop-types
  itemUrl: PropTypes.func.isRequired,
  emptyState: PropTypes.node,
};
FavoriteList.defaultProps = { emptyState: null };

export function DashboardAndQueryFavoritesList() {
  return (
    <div className="tile">
      <div className="t-body tb-padding">
        <div className="row home-favorites-list">
          <div className="col-sm-6 m-t-20">
            <FavoriteList
              title="收藏的仪表盘"
              resource={Dashboard}
              itemUrl={dashboard => dashboard.url}
              emptyState={
                <p>
                  <span className="btn-favorite m-r-5">
                    <i className="fa fa-star" aria-hidden="true" />
                  </span>
                  收藏的 <Link href="dashboards">仪表盘</Link>会出现在这里
                </p>
              }
            />
          </div>
          <div className="col-sm-6 m-t-20">
            <FavoriteList
              title="收藏的查询"
              resource={Query}
              itemUrl={query => `queries/${query.id}`}
              emptyState={
                <p>
                  <span className="btn-favorite m-r-5">
                    <i className="fa fa-star" aria-hidden="true" />
                  </span>
                  收藏的 <Link href="queries">查询</Link> 会出现在这里
                </p>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
