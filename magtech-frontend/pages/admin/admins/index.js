import AdminLayout from '~/components/layouts/AdminLayout';
import Admin from '~/utils/Admin';
import {Modal, notification, Popconfirm, Spin} from 'antd';
import {useEffect, useState} from 'react';

export default function AdminsPage () {
  const [admins, setAdmins] = useState ([]);
  const [isLoading, setIsLoading] = useState (false);
  const [isDeleting, setIsDeleting] = useState (false);
  const [count, setCount] = useState (0);

  async function getPayments () {
    setIsLoading (true);
    const apiData = await Admin.getAdmins ();
    console.log (apiData);
    setAdmins (apiData.admins);
    setIsLoading (false);
  }

  useEffect (
    () => {
      getPayments ();
    },
    [count]
  );

  const deleteAdmin = id => {
    return async () => {
      setIsDeleting (true);
      const response = await Admin.deleteAdmin (id);
      setIsDeleting (false);
      console.log(response)
      if (response.status === 'success') {
        notification.success ({
          className: 'mg-bg-component',
          message: <h2 className="mg-text-white">Success</h2>,
          description: <p className="mg-text-white">{response.message}</p>,
        });
        setCount (prev => prev + 1);
      } else {
        notification.error ({
          className: 'mg-bg-component',
          message: <h2 className="mg-text-white">Failed</h2>,
          description: <p className="mg-text-white">{response.error}</p>,
        });
      }
    };
  };
  const goToPage = () => {
    window.location.assign ('/admin/admins/add');
  };
  return (
    <AdminLayout title={'Admins'}>
      <Modal
        footer={null}
        closable={false}
        centered
        modalRender={() => (
          <div className="mg-d-flex mg-align-center mg-justify-center">
            <div className="mg-text-center">
              <Spin size="large" />
              <p className="mg-text-grey">Deleting Admin</p>
            </div>
          </div>
        )}
        visible={isDeleting}
      />
      <br />
      <div className="row mg-vh-85">
        <div className="col-12 mg-bg-component mg-rounded">
          <div className="mg-d-flex mg-justify-between mg-align-center">
            <p className="mg-small-20 mg-text-primary mg-font-bold mg-font-euclid">
              All Users
            </p>
            <p
              className="mg-btn-outline-primary mg-font-bold mg-font-euclid"
              onClick={goToPage}
            >
              Add Admin
            </p>
          </div>
          {isLoading
            ? <div className="mg-d-flex mg-justify-center mg-align-center mg-w-100 mg-min-vh-80">
                <Spin size="large" />
              </div>
            : admins.length > 0
                ? admins.map (p => (
                    <div
                      className="mg-bg-dark mg-min-vh-10 mg-rounded mg-d-flex mg-justify-between mg-align-center"
                      style={{margin: '10px auto', padding: '10px'}}
                    >
                      <div>
                        <h2 className="mg-text-primary mg-font-euclid mg-font-bold mg-small-18 mg-small-md-14">
                          {p.username}
                        </h2>
                        <p className="mg-text-grey mg-small-12">{p.admin_id}</p>
                        <Popconfirm
                          title="Are you sure to delete this Admin? This cannot be reversed"
                          onConfirm={deleteAdmin (p.admin_id)}
                          onCancel={() => {}}
                          okText="Yes"
                          cancelText="No"
                        >
                          <button
                            className="mg-btn-outline-danger"
                            style={{
                              fontSize: '12px',
                              marginTop: '8px',
                              padding: '8px',
                            }}
                          >
                            Remove Admin
                          </button>
                        </Popconfirm>
                      </div>
                      <div className="mg-font-euclid" />
                      <div>
                        <p className="mg-text-grey mg-small-12">
                          <span className="mg-text-primary mg-small-12">
                            joined
                          </span>
                          :
                          {' '}
                          {new Date (p.createdAt).toDateString ()}
                        </p>
                      </div>
                    </div>
                  ))
                : <div className="mg-d-flex mg-justify-center mg-align-center mg-w-100 mg-min-vh-80">
                    <h2 className="mg-text-center mg-text-disabled mg-small-20">
                      No Registered Admin
                    </h2>
                  </div>}
        </div>
      </div><br />
    </AdminLayout>
  );
}
