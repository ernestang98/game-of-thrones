
namespace Shared.CZ3003.Scripts
{
    using Photon.Pun;
    using UnityEngine;
    public class HelmetChange : MonoBehaviourPun 
    {
        public Texture blackHair;
        public Texture redHair;
        private Renderer _rend;
        public GameObject helmet;

        public void Awake()
        {
            _rend = helmet.GetComponent<Renderer>();

        }

        void Update ()
        {

            if (!photonView.IsMine)
                return;
            if (Input.GetKeyDown (KeyCode.K)) {
                photonView.RPC("ChangeHairColour", RpcTarget.AllViaServer, 1);

            }
		
            if (Input.GetKeyDown (KeyCode.L)) {
                photonView.RPC("ChangeHairColour", RpcTarget.AllViaServer, 2);
            }

        }
	
	    [PunRPC]    
        void ChangeHairColour(int hairNum){
            

            if(hairNum == 1)
            {
                _rend.material.mainTexture = blackHair;

            } else if(hairNum == 2) {
                _rend.material.mainTexture = redHair;

            }
		
		
        }
    }
}