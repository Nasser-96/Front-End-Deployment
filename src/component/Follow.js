import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import "./Follow.css";

function Follow() {
  const [categories, setCategories] = useState([]);
  const [followCategory, setFollowCategory] = useState("");
  const [UnFollow, setUnFollow] = useState("");
  const [myCategory, setMyCategory] = useState([]);
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();

  const state = useSelector((state) => {
    return {
      userInfo: state.UserReducer,
      token: state.UserReducer.token,
    };
  });

  useEffect(() => {
    axios
      .get(`https://final-project-tuwaiq.herokuapp.com/category`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://final-project-tuwaiq.herokuapp.com/follow/${state.userInfo.userLogged.id}`
      )
      .then((response) => {
        setMyCategory(response.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  const data = {
    user: { id: state.userInfo.userLogged.id },
    category: { id: followCategory },
  };

  const FollowCategory = () => {
    console.log(followCategory);
    const config = {
      headers: { Authorization: `Bearer ${state.token}` },
    };
    axios
      .post(`https://final-project-tuwaiq.herokuapp.com/follow`, data, config)
      .then((response) => {
        navigate("/");
      })
      .catch((err) =>
        err.response.data === "You Already Follow this Category"
          ? setErrMsg(err.response.data)
          : console.log(err)
      );
  };

  const UnFollowCategory = () => {
    const config = {
      headers: { Authorization: `Bearer ${state.token}` },
    };
    axios
      .delete(
        `https://final-project-tuwaiq.herokuapp.com/follow/${UnFollow}`,
        config
      )
      .then((response) => {
        navigate("/");
      })
      .catch((err) => console.log(err.response));
  };
  return (
    <>
      <div className="gridFllow">
        <div className="backGround">
          <div className="logInPage">
            <section class="signup">
              <div class="container">
                <div class="signup-content">
                  <form method="POST" id="signup-form" class="signup-form">
                    <h2 class="form-title">Follow</h2>
                    <div class="form-group ">
                      <select
                        id="cars"
                        className="option"
                        onChange={(e) => setFollowCategory(e.target.value)}
                      >
                        <option value="">Choose Topic</option>
                        {categories.map((e) => {
                          return <option value={e.id}> {e.category} </option>;
                        })}
                      </select>
                    </div>
                    <div class="form-group">
                      <input
                        type="button"
                        class="form-submit"
                        value="Follow"
                        onClick={FollowCategory}
                      />
                    </div>
                    <div class="form-group">
                      <div className="centerErr">{errMsg}</div>
                    </div>
                  </form>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* ---------------------------------------------------------------------- */}
        <div className="backGround">
          <div className="logInPage">
            <section class="signup">
              <div class="container">
                <div class="signup-content">
                  <form method="POST" id="signup-form" class="signup-form">
                    <h2 class="">UnFollow</h2>
                    <div class="form-group ">
                      <select
                        id="cars"
                        className="option"
                        onChange={(e) => setUnFollow(e.target.value)}
                      >
                        <option value="">Choose Topic</option>
                        {myCategory.map((e) => {
                          return (
                            <option value={e.id}>
                              {" "}
                              {e.category.category}{" "}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div class="form-group">
                      <input
                        type="button"
                        class="form-submit"
                        value="Un Follow"
                        onClick={UnFollowCategory}
                      />
                    </div>
                    <div class="form-group"></div>
                  </form>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default Follow;
