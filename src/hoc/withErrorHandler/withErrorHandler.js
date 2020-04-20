import React, { Component } from "react";
import Auxiliary from "../Auxiliary/Auxiliary";
import Modal from "../../components/UI/Modal/Modal";

// A Javascript function that accepts the WrappedComponent as an argument and then adds error handling functionality to it.
const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    };

    componentWillMount() {
      // Global interceptors that intercept all the requests and responses and catch the errors.
      // First argument is the request/response object and the second argument is the error object.
      this.requestInterceptor = axios.interceptors.request.use(
        (request) => {
          this.setState({ error: null });
          return request;
        },
        (error) => {
          return this.setState({ error: error });
        }
      );
      this.responseInterceptor = axios.interceptors.response.use(
        (response) => response,
        (error) => {
          return this.setState({ error: error });
        }
      );
    }

    // This is to eject the interceptors that are attached to the WrappedComponent if the WrappedComponent is unmounted.
    // Else there will be memory leakage due to existing old interceptors.
    componentWillUnmount() {
      console.log(
        "[withErrorHandler]  componentWillUnmount - Ejecting interceptors"
      );
      axios.interceptors.request.eject(this.requestInterceptor);
      axios.interceptors.request.eject(this.responseInterceptor);
    }

    errorConfirmedHandler = () => this.setState({ error: null });

    render() {
      return (
        <Auxiliary>
          <Modal
            // The Modal is only shown if there is an error and hence to hide it, the error state has to be set to null
            showModal={this.state.error}
            hideModal={this.errorConfirmedHandler}
          >
            {/* The error is initially set to null and message object will not be available and hence this ternary expression */}
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Auxiliary>
      );
    }
  };
};

export default withErrorHandler;
