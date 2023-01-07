import React, { useState, useRef, useEffect } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

import { Modal, Button, Form, Spinner, Table } from "react-bootstrap";

import {
  API_URL,
  BEARER_TOKEN,
  COMPANY_ID,
  US_COUNTRY_ID,
} from "../../config/constants";

import ModalC from "../ModalC";

let total = 0;
let timer = null;

const ModalB = (props) => {
  const innerRef = useRef();
  const [isFetching, setIsFetching] = useState(false);
  const [contacts, setContacts] = useState({});
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState(null);
  const [isEven, setEven] = useState(false);
  const [contact, setContact] = useState(null);
  const [modalCShow, setModalCShow] = useState(false);

  const fetchAllContacts = async (reload = false, q = null) => {
    try {
      setIsFetching(true);

      let params = {
        countryId: US_COUNTRY_ID,
        companyId: COMPANY_ID,
        page: reload ? 1 : page,
      };

      if (search) {
        params = { ...params, ...{ query: q ? q : search } };
      }

      const res = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
        params,
      });

      const records_count = Object.keys(res.data.contacts).length;

      total += records_count;

      if (total >= res.data.total) {
        setHasMore(false);
      }

      setIsFetching(false);
      let data = res.data.contacts;

      if (isEven) {
        data = Object.keys(data)
          .map((id) => {
            if (id % 2 === 0) {
              return data[id];
            }
            return false;
          })
          .filter(Boolean);
        console.log(data);
      }

      if (reload) {
        setContacts(data);
        setPage(2);
      } else {
        setContacts({ ...contacts, ...data });
        setPage(page + 1);
      }
    } catch (err) {
      setIsFetching(false);
      console.log(err);
    }
  };

  const onScroll = () => {
    if (innerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = innerRef.current;

      if (scrollTop + clientHeight === scrollHeight && !isFetching && hasMore) {
        fetchAllContacts();
      }
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;

    setSearch(query);
  };

  const handleCheck = (e) => {
    setEven(e.target.checked);
  };

  const handleEnter = (e) => {
    if ((e.key === "Enter" || e.keyCode === 13) && e.target.value) {
      fetchAllContacts(true, e.target.value);
    }
  };

  useEffect(() => {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      fetchAllContacts(true);
    }, 2000);
  }, [search]);

  useEffect(() => {
    fetchAllContacts(true);
  }, [isEven]);

  useEffect(() => {
    if (contact) {
      setModalCShow(true);
    }
  }, [contact]);

  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onEntered={() => fetchAllContacts()}
    >
      <Modal.Header>
        <div>
          <Button
            onClick={props.switchModal}
            className="mr-4 cursor-pointer btn-a"
          >
            All Contacts
          </Button>
          <Button className="cursor-pointer btn-b">US Contacts</Button>
        </div>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Header>

      <Modal.Body>
        <Form.Control
          type="text"
          placeholder="Search..."
          className="mb-4"
          onChange={handleSearch}
          onKeyUp={handleEnter}
        />

        <div onScroll={onScroll} ref={innerRef} className="content">
          {Object.keys(contacts).length > 0 && (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(contacts).map((key, index) => {
                  const { id, first_name, phone_number, email } = contacts[key];
                  return (
                    <tr onClick={() => setContact(contacts[key])} key={index}>
                      <td>{id}</td>
                      <td>{first_name}</td>
                      <td>{phone_number}</td>
                      <td>{email}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}

          {isFetching && (
            <div className="d-flex justify-content-center">
              <Spinner animation="border" role="status" />
            </div>
          )}
        </div>
      </Modal.Body>

      <Modal.Footer className="justify-content-start">
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="Only Even"
            onChange={handleCheck}
          />
        </Form.Group>
      </Modal.Footer>
      <ModalC
        show={modalCShow}
        contact={contact}
        onHide={() => setModalCShow(false)}
      />
    </Modal>
  );
};

export default withRouter(ModalB);
