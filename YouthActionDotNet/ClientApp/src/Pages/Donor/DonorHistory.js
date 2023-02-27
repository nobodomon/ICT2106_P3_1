import React from "react";
import { Loading } from "../../Components/appCommon";
import DatapageLayout from "../PageLayout";

export default class DonorHistory extends React.Component {
  state = {
    loading: true,
    donations: [],
  };

  componentDidMount = async () => {
    await this.getDonations()
      .then((response) => {
        if (response.success) {
          console.log(response);
          this.setState({
            donations: response.data,
            loading: false,
          });
        }
      })
      .catch((error) => {
        this.setState({ error: error.message, loading: false });
      });
  };

  getDonations = async () => {
    var loggedInVol = this.props.user.data;
    console.log(loggedInVol.UserId);
    return fetch("/api/DonorDashboard/GetByDonorId/" + loggedInVol.UserId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      return response.json();
    });
  };

  render() {
    if (this.state.loading) {
      return <Loading></Loading>;
    } else {
      return (
        <div className="col-md-12">
          <div className="row">
            <div className="tableHeader p-4">
              <div className="tableHeaderActions ">
                <div className="d-flex justify-content-start align-items-center">
                  <div className="tableTitleContainer">
                    <div
                      className="tableTitlePulseAnimation-1"
                      style={
                        this.state.searchBarExtended
                          ? { "--ScaleMultiplier": 0.75 }
                          : { "--ScaleMultiplier": 2 }
                      }
                    ></div>
                    <div
                      className="tableTitlePulseAnimation-2"
                      style={
                        this.state.searchBarExtended
                          ? { "--ScaleMultiplier": 0.75 }
                          : { "--ScaleMultiplier": 2 }
                      }
                    ></div>
                    <div
                      className="tableTitlePulseAnimation-3"
                      style={
                        this.state.searchBarExtended
                          ? { "--ScaleMultiplier": 0.75 }
                          : { "--ScaleMultiplier": 2 }
                      }
                    ></div>
                    <span className="tableTitle">Donation History</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row p-3">
            <div className="col-md-12">
              <table className="table ">
                <thead>
                  <tr>
                    <th>Donation Type</th>
                    <th>Donation Amount</th>
                    <th>Donation Constraint</th>
                    <th>Donation Date</th>
                    <th>Project Id</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.donations.map((donation) => (
                    <tr key={donation.DonationsId}>
                      <td>{donation.DonationType}</td>
                      <td>{donation.DonationAmount}</td>
                      <td>{donation.DonationConstraint}</td>
                      <td>{donation.DonationDate}</td>
                      <td>{donation.ProjectId}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }
  }
}
